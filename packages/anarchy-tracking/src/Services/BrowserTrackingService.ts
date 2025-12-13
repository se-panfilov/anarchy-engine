import { isDefined } from '@Anarchy/Shared/Utils';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { BrowserOptions, EventHint } from '@sentry/browser';
import { captureException, init } from '@sentry/browser';
import type { Client, ErrorEvent } from '@sentry/core';

export function BrowserTrackingService(options?: BrowserOptions, metaData?: Record<string, any>): TTrackingService {
  const defaultOptions: BrowserOptions = {
    beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(event.user)) event.user = null as any;

      if (event.request) {
        // eslint-disable-next-line functional/immutable-data
        event.request = {
          ...event.request,
          url: 'hidden',
          headers: {
            ...event.request?.headers,
            url: 'hidden',
            Referer: 'hidden',
            referer: 'hidden'
          }
        };

        // eslint-disable-next-line functional/immutable-data
        delete (event.request.headers as any).Cookie;
        // eslint-disable-next-line functional/immutable-data
        delete (event.request.headers as any).cookie;
      }

      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.geo) delete (event as any).contexts.geo;
      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.Geography) delete (event as any).contexts.Geography;
      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.geography) delete (event as any).contexts.geography;

      // eslint-disable-next-line functional/immutable-data
      if (isDefined(event.breadcrumbs)) event.breadcrumbs = undefined;

      // eslint-disable-next-line functional/immutable-data
      (event as any).tags = { ...event.tags, ...metaData };

      return event;
    },
    tracesSampleRate: 0,
    //Important: make sure this is false if you want Anonymous reports (no IPs, etc.).
    sendDefaultPii: false
  };

  const client: Client | undefined = init({
    ...defaultOptions,
    ...options
  });

  const onError = (ev: any): void => void captureException(ev.error ?? ev);
  const onRejection = (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent).reason ?? ev);

  function start(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    window.addEventListener('error', onErrorHandler);
    window.addEventListener('unhandledrejection', onRejectionHandler);
  }

  function stop(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    window.removeEventListener('error', onErrorHandler);
    window.removeEventListener('unhandledrejection', onRejectionHandler);
  }

  if (isDefined(client)) start();

  return {
    client,
    captureException,
    start,
    stop
  };
}
