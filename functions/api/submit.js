export const onRequestPost = async (context) => {
  try {
    const requestData = await context.request.json();
    const { token, action, data } = requestData;

    // 1. Validate inputs
    if (!action || !data) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid payload: missing action or data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Verify Turnstile token with Cloudflare API
    const turnstileSecret = context.env.TURNSTILE_SECRET;
    if (turnstileSecret && turnstileSecret !== 'disabled') {
      if (!token) {
        console.warn('Spam verification token is missing (Turnstile), but proceeding with submission.');
      } else {
        const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: token,
            remoteip: context.request.headers.get('CF-Connecting-IP') || '',
          }),
        });

        const verifyResult = await verifyResponse.json();
        if (!verifyResult.success) {
          console.warn('Turnstile verification failed (spam check):', verifyResult['error-codes'], 'proceeding with submission anyway.');
        }
      }
    } else {
      console.warn('Cloudflare Turnstile secret key is not configured or disabled. Skipping server-side Turnstile verification.');
    }

    // 3. Forward request to Google Apps Script Web App
    const appsScriptUrl = context.env.APPS_SCRIPT_URL;
    if (!appsScriptUrl) {
      return new Response(JSON.stringify({ success: false, error: 'Google Apps Script backend URL is not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const scriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      body: JSON.stringify({ action, data }),
    });

    const scriptResult = await scriptResponse.text();
    return new Response(scriptResult, {
      status: scriptResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
