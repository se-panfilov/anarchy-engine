import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { BrowserOptions } from '@sentry/browser';
import { captureException, init } from '@sentry/browser';
import type { Client } from '@sentry/core';

const defaultOptions: BrowserOptions = {
  // eslint-disable-next-line spellcheck/spell-checker
  // dsn: import.meta.env.VITE_SENTRY_DSN,
  // environment: import.meta.env.MODE,
  // release: __APP_VERSION__,
  // TODO DESKTOP: check if beforeSend is doing a real anonymization
  // beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
  //   // eslint-disable-next-line functional/immutable-data
  //   event.user = null as any;
  //   // eslint-disable-next-line functional/immutable-data
  //   if (event.request) delete (event as any).request;
  //   // eslint-disable-next-line functional/immutable-data
  //   event.tags = { ...(event.tags ?? {}), app: 'web', release: __APP_VERSION__ };
  //   // eslint-disable-next-line functional/immutable-data
  //   event.breadcrumbs = undefined;
  //
  //   return event;
  // },
  tracesSampleRate: 0,
  //Important: make sure this is false if you want Anonymous reports (no IPs, etc.).
  // eslint-disable-next-line spellcheck/spell-checker
  sendDefaultPii: false
};

export function BrowserTrackingService(options?: BrowserOptions): TTrackingService {
  const client: Client | undefined = init({
    ...defaultOptions,
    ...options
  });

  window.addEventListener('error', (ev: ErrorEvent): void => {
    captureException(ev.error ?? ev);
  });

  // eslint-disable-next-line spellcheck/spell-checker
  window.addEventListener('unhandledrejection', (ev: PromiseRejectionEvent): void => {
    captureException((ev as PromiseRejectionEvent).reason ?? ev);
  });

  return {
    client,
    captureException
  };
}

(window as any).myUndefinedFunction();
