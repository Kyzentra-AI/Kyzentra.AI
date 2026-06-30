/**
 * Google Apps Script Web App for Kyzentra.AI Forms
 * 
 * Instructions:
 * 1. Create a Google Sheet.
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all default code with this script.
 * 4. Save and click "Deploy" -> "New deployment".
 * 5. Select "Web app" as the type.
 * 6. Set "Execute as" to "Me".
 * 7. Set "Who has access" to "Anyone".
 * 8. Deploy and authorize the script permissions.
 * 9. Copy the generated Web App URL and add it to your Cloudflare Pages environment variables as `APPS_SCRIPT_URL`.
 */

function doPost(e) {
  try {
    var requestData = JSON.parse(e.postData.contents);
    var action = requestData.action;
    var data = requestData.data;
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet;
    
    if (action === 'waitlist') {
      sheet = getOrCreateSheet(ss, "Kyzentra - UniOS.ai Waitlist", [
        "Timestamp", "Full Name", "School Name", "Designation", "Email", 
        "Phone", "Student Count", "City", "State", "Country", "Message", "Source"
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
        data.message || "",
        "Website"
      ]);
    } else if (action === 'careers') {
      var resumeLink = "";
      if (data.resumeFile && data.resumeFile.base64) {
        resumeLink = uploadFile(data.resumeFile.base64, data.resumeFile.name, data.resumeFile.mimeType);
      }
      
      sheet = getOrCreateSheet(ss, "Kyzentra - Career Applications", [
        "Timestamp", "Name", "Email", "Phone", "College", "Degree", "Branch", 
        "Graduation Year", "Position", "Employment Type", "Skills", "GitHub", 
        "LinkedIn", "Portfolio", "Resume Link", "Cover Letter", "Status"
      ]);
      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.phone,
        data.college,
        data.degree,
        data.branch,
        data.graduationYear,
        data.position,
        data.employmentType,
        data.skills,
        data.github || "",
        data.linkedin || "",
        data.portfolio || "",
        resumeLink,
        data.coverLetter || "",
        "New"
      ]);
    } else if (action === 'contact') {
      sheet = getOrCreateSheet(ss, "Kyzentra - Contact Messages", [
        "Timestamp", "Name", "Email", "Company", "Subject", "Message", "Status"
      ]);
      sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.company,
        data.subject,
        data.message,
        "New"
      ]);
    } else if (action === 'demo') {
      sheet = getOrCreateSheet(ss, "Kyzentra - Demo Requests", [
        "Timestamp", "Name", "School", "Designation", "Email", "Phone", 
        "Student Count", "Preferred Date", "Preferred Time", "Notes", "Status"
      ]);
      sheet.appendRow([
        new Date(),
        data.name,
        data.school,
        data.designation,
        data.email,
        data.phone,
        data.studentCount,
        data.preferredDate,
        data.preferredTime,
        data.notes || "",
        "Pending"
      ]);
    } else {
      throw new Error("Invalid action: " + action);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Finds a sheet by name or creates it if it doesn't exist, appending the headers.
 */
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#f3f3f3");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Decodes base64 file data and saves it to a Google Drive folder named "Kyzentra Resumes".
 * Returns the public view URL.
 */
function uploadFile(base64Data, fileName, mimeType) {
  var folderName = "Kyzentra Resumes";
  var folders = DriveApp.getFoldersByName(folderName);
  var folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(folderName);
  }
  var decoded = Utilities.base64Decode(base64Data);
  var blob = Utilities.newBlob(decoded, mimeType, fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}
