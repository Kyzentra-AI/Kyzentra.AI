/**
 * Submits form data directly to the Google Apps Script Web App.
 *
 * @param action - 'waitlist' | 'careers' | 'contact' | 'demo'
 * @param data   - Form payload object
 */
export const submitForm = async (action: string, data: any, _turnstileToken?: string) => {
  // Use env variable if available, otherwise fall back to hardcoded URL
  const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL
    || 'https://script.google.com/macros/s/AKfycbx6sbUiAGQYdium5j3u4VZ5X0oqGdPGZ48KjovZmUyaCn4AsMnVLaRl3B2cexizLraD/exec';

  // Send action and data. Token is optional — backend skips verification if TURNSTILE_SECRET is not configured.
  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    body: JSON.stringify({ action, data, token: _turnstileToken || '' }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}. Please try again.`);
  }

  const result = await response.json() as { success: boolean; error?: string };

  if (!result.success) {
    throw new Error(result.error || 'Submission failed. Please try again.');
  }

  return result;
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
