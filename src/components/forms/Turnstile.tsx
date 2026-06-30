import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.warn("Cloudflare Turnstile site key is missing! Please configure VITE_TURNSTILE_SITE_KEY.");
      return;
    }

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (containerRef.current && window.turnstile) {
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onSuccess,
          'error-callback': onError,
          'expired-callback': onExpire,
          theme: 'dark'
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      // Set a polling interval in case the script tag is still loading in the background
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey, onSuccess, onError, onExpire]);

  if (!siteKey) {
    return (
      <div style={{ color: '#ef4444', fontSize: '0.8rem', padding: '8px', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.05)' }}>
        Spam protection error: Site key is not configured.
      </div>
    );
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        margin: '8px 0 4px',
        minHeight: '65px' 
      }}
    >
      <div ref={containerRef} />
    </div>
  );
}
