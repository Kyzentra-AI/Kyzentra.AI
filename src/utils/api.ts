/**
 * Helper to convert a file to a base64 encoded structure for Apps Script upload.
 */
export interface FileData {
  base64: string;
  name: string;
  mimeType: string;
}

export const fileToBase64 = (file: File): Promise<FileData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve({
        base64,
        name: file.name,
        mimeType: file.type
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const submitForm = async (action: string, data: any, turnstileToken: string) => {
  const isDev = import.meta.env.DEV;
  const devUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

  if (isDev && devUrl) {
    console.log("Local Dev Mode: Submitting directly to Google Apps Script Web App");
    // Send without Content-Type header to trigger a simple request and bypass CORS preflight OPTIONS block
    const response = await fetch(devUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: action,
        data: data
      })
    });

    const result = await response.json() as { success: boolean; error?: string };

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit directly to Google Sheets in dev mode.');
    }

    return result;
  }

  // Production path via serverless proxy
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: turnstileToken,
      action: action,
      data: data
    })
  });

  const result = await response.json() as { success: boolean; error?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to submit the form request. Please try again.');
  }

  return result;
};
