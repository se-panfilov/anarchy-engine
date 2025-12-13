import { isDefined } from '@Anarchy/Shared/Utils';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { BrowserOptions, EventHint } from '@sentry/browser';
import { captureException, init } from '@sentry/browser';
import type { Client, ErrorEvent } from '@sentry/core';

const defaultOptions: BrowserOptions = {
  beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(event.user)) event.user = null as any;

    // eslint-disable-next-line functional/immutable-data
    event.request = {
      ...event.request,
      url: 'hidden',
      headers: {
        ...event.request?.headers,
        url: 'hidden'
      }
    };

    // eslint-disable-next-line functional/immutable-data
    if (isDefined(event.breadcrumbs)) event.breadcrumbs = undefined;

    return event;
  },
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

  window.addEventListener('error', (ev: any): void => void captureException(ev.error ?? ev));

  // eslint-disable-next-line spellcheck/spell-checker
  window.addEventListener('unhandledrejection', (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent).reason ?? ev));

  return {
    client,
    captureException
  };
}
