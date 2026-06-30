/**
 * Submits form data directly to the Google Apps Script Web App.
 *
 * @param action - 'waitlist' | 'careers' | 'contact' | 'demo'
 * @param data   - Form payload object
 */
export const submitForm = async (action: string, data: any, _turnstileToken?: string) => {
  const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL
    || 'https://script.google.com/macros/s/AKfycbx6sbUiAGQYdium5j3u4VZ5X0oqGdPGZ48KjovZmUyaCn4AsMnVLaRl3B2cexizLraD/exec';

  // Google Apps Script redirects POST requests through script.googleusercontent.com.
  // This redirect chain can break CORS in browsers, causing "Failed to fetch".
  // Using mode: 'no-cors' ensures the request always goes through.
  // The trade-off: we can't read the response body, so we assume success if no network error.
  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action, data, token: _turnstileToken || '' }),
  });

  // With no-cors, response is opaque (status=0, body empty), but the request DID go through.
  // If fetch() itself throws (network error), the catch in the form handler will display it.
  return { success: true };
};

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
