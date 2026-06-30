/**
 * Google Apps Script Web App for Kyzentra.AI Forms
 *
 * Setup Instructions:
 * 1. Create or open a Google Sheet.
 * 2. Click Extensions → Apps Script.
 * 3. Replace all default code with this script.
 * 4. Go to Project Settings (gear icon) → Script Properties.
 * 5. Add a property: Name = TURNSTILE_SECRET, Value = your Cloudflare Turnstile secret key.
 * 6. Select "testPermissions" from the run dropdown and click "Run" to authorize the script.
 * 7. Save, then click Deploy → New deployment.
 * 8. Select type: Web app. Execute as: Me. Who has access: Anyone.
 * 9. Authorize and copy the Web App URL.
 * 10. Add that URL as VITE_APPS_SCRIPT_URL in your Cloudflare Pages environment variables.
 */

/**
 * RUN THIS FUNCTION ONCE IN THE EDITOR TO AUTHORIZE THE SCRIPT
 */
function testPermissions() {
  Logger.log('Active User: ' + Session.getActiveUser().getEmail());
  try {
    UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: { secret: 'test', response: 'test' }
    });
    Logger.log('External request permission verified successfully.');
  } catch (e) {
    Logger.log('External request check complete: ' + e.toString());
  }
}

/**
 * Handle CORS preflight OPTIONS requests.
 */
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Main POST handler — verifies Turnstile then writes to Sheets.
 */
function doPost(e) {
  try {
    // Always return JSON, never HTML
    var requestData = JSON.parse(e.postData.contents);
    var action = requestData.action;
    var data = requestData.data;
    var turnstileToken = requestData.token || '';

    // --- 1. Validate required fields ---
    if (!action || !data) {
      return jsonResponse({ success: false, error: 'Invalid payload: missing action or data.' });
    }

    // --- 2. Verify Turnstile token ---
    var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
    if (!secret) {
      // If no secret is configured, skip verification (dev mode fallback)
      Logger.log('Warning: TURNSTILE_SECRET not set in Script Properties. Skipping verification.');
    } else if (!turnstileToken) {
      return jsonResponse({ success: false, error: 'Spam verification token missing. Please complete the verification.' });
    } else {
      var verifyResult = verifyTurnstile(secret, turnstileToken);
      if (!verifyResult.success) {
        var errStr = 'Turnstile verification failed';
        if (verifyResult.errors && verifyResult.errors.length > 0) {
          errStr += ' (Cloudflare Error: ' + verifyResult.errors.join(', ') + ')';
        }
        return jsonResponse({ success: false, error: errStr + '. Please refresh and try again.' });
      }
    }

    // --- 3. Write to the appropriate sheet ---
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;

    if (action === 'waitlist') {
      sheet = getOrCreateSheet(ss, 'Kyzentra - UniOS.ai Waitlist', [
        'Timestamp', 'Full Name', 'School Name', 'Designation', 'Email',
        'Phone', 'Student Count', 'City', 'State', 'Country', 'Message', 'Source'
      ]);
      sheet.appendRow([
        new Date(),
        data.fullName,
        data.schoolName,
        data.designation,
        data.email,
        data.phone,
        data.studentCount,
        data.city,
        data.state,
        data.country,
        data.message || '',
        'Website'
      ]);

    } else if (action === 'careers') {
      var resumeLink = '';
      if (data.resumeFile && data.resumeFile.base64) {
        resumeLink = uploadFile(data.resumeFile.base64, data.resumeFile.name, data.resumeFile.mimeType);
      }
      sheet = getOrCreateSheet(ss, 'Kyzentra - Career Applications', [
        'Timestamp', 'Name', 'Email', 'Phone', 'College', 'Degree', 'Branch',
        'Graduation Year', 'Position', 'Employment Type', 'Skills', 'GitHub',
        'LinkedIn', 'Portfolio', 'Resume Link', 'Cover Letter', 'Status'
      ]);
      sheet.appendRow([
        new Date(),
        data.name, data.email, data.phone, data.college, data.degree,
        data.branch, data.graduationYear, data.position, data.employmentType,
        data.skills, data.github || '', data.linkedin || '',
        data.portfolio || '', resumeLink, data.coverLetter || '', 'New'
      ]);

    } else if (action === 'contact') {
      sheet = getOrCreateSheet(ss, 'Kyzentra - Contact Messages', [
        'Timestamp', 'Name', 'Email', 'Company', 'Subject', 'Message', 'Status'
      ]);
      sheet.appendRow([
        new Date(),
        data.name, data.email, data.company, data.subject, data.message, 'New'
      ]);

    } else if (action === 'demo') {
      sheet = getOrCreateSheet(ss, 'Kyzentra - Demo Requests', [
        'Timestamp', 'Name', 'School', 'Designation', 'Email', 'Phone',
        'Student Count', 'Preferred Date', 'Preferred Time', 'Notes', 'Status'
      ]);
      sheet.appendRow([
        new Date(),
        data.name, data.school, data.designation, data.email, data.phone,
        data.studentCount, data.preferredDate, data.preferredTime,
        data.notes || '', 'Pending'
      ]);

    } else {
      return jsonResponse({ success: false, error: 'Unknown action: ' + action });
    }

    return jsonResponse({ success: true });

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return jsonResponse({ success: false, error: 'Server error: ' + err.message });
  }
}

function verifyTurnstile(secret, token) {
  try {
    var response = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: {
        secret: secret.trim(),
        response: token.trim()
      },
      muteHttpExceptions: true
    });
    var result = JSON.parse(response.getContentText());
    Logger.log('Turnstile verify result: ' + JSON.stringify(result));
    return {
      success: result.success === true,
      errors: result['error-codes'] || []
    };
  } catch (err) {
    Logger.log('Turnstile verification error: ' + err.toString());
    return {
      success: false,
      errors: ['internal-script-error: ' + err.toString()]
    };
  }
}

/**
 * Always returns a JSON ContentService response.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Finds or creates a sheet with the given name and headers.
 */
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f3f3f3');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Decodes base64 file data and saves it to Google Drive folder "Kyzentra Resumes".
 * Returns the public view URL.
 */
function uploadFile(base64Data, fileName, mimeType) {
  var folderName = 'Kyzentra Resumes';
  var folders = DriveApp.getFoldersByName(folderName);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}
