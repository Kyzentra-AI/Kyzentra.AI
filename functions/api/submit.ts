interface Env {
  TURNSTILE_SECRET: string;
  APPS_SCRIPT_URL: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const requestData = await context.request.json() as { token: string; action: string; data: any };
    const { token, action, data } = requestData;

    // 1. Validate inputs
    if (!action || !data) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid payload: missing action or data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!token) {
      return new Response(JSON.stringify({ success: false, error: 'Spam verification token is missing (Turnstile)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Verify Turnstile token with Cloudflare API
    if (!context.env.TURNSTILE_SECRET) {
      return new Response(JSON.stringify({ success: false, error: 'Cloudflare Turnstile secret key is not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: context.env.TURNSTILE_SECRET,
        response: token,
        remoteip: context.request.headers.get('CF-Connecting-IP') || '',
      }),
    });

    const verifyResult = await verifyResponse.json() as { success: boolean; 'error-codes'?: string[] };
    if (!verifyResult.success) {
      return new Response(JSON.stringify({ success: false, error: 'Turnstile verification failed (spam check)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Forward request to Google Apps Script Web App
    if (!context.env.APPS_SCRIPT_URL) {
      return new Response(JSON.stringify({ success: false, error: 'Google Apps Script backend URL is not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const scriptResponse = await fetch(context.env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data }),
    });

    const scriptResult = await scriptResponse.text();
    return new Response(scriptResult, {
      status: scriptResponse.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
