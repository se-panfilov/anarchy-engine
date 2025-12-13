import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { BrowserOptions } from '@sentry/browser';
import { init } from '@sentry/browser';
import type { Client } from '@sentry/core';

const defaultOptions: BrowserOptions = {
  //Important: make sure this is false if you want Anonymous reports (no IPs, etc.).
  // eslint-disable-next-line spellcheck/spell-checker
  sendDefaultPii: false
};

export function BrowserTrackingService(options?: BrowserOptions): TTrackingService {
  const client: Client | undefined = init({
    ...defaultOptions,
    ...options
  });

  return {
    client
  };
}

(window as any).myUndefinedFunction();
