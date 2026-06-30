import React, { useEffect, useRef } from 'react';

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

// Cloudflare's always-pass visible test key — works on ALL domains without whitelist config.
// Swap to a real key once your production domain is added to the Turnstile widget's allowed hostnames.
const ALWAYS_PASS_TEST_KEY = '1x00000000000000000000AA';

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Prefer the env-var key; fall back to the always-pass test key so the widget never breaks on unwhitelisted domains.
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ALWAYS_PASS_TEST_KEY;

  useEffect(() => {
    if (siteKey === 'disabled') return;

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

  if (siteKey === 'disabled') {
    return null;
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
