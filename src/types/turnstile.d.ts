interface Window {
  turnstile?: {
    render: (
      container: string | HTMLElement,
      options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
      }
    ) => string;
    remove: (widgetId: string) => void;
  };
}
