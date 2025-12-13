import { isDefined } from '@Anarchy/Shared/Utils';
import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import { rewriteFramesIntegrationBrowser } from '@Anarchy/Tracking/Utils/IntegrationsBrowser';
import { scrubUserPathsBrowser } from '@Anarchy/Tracking/Utils/ScrubsBrowser';
import type { BrowserOptions, EventHint } from '@sentry/browser';
import { captureException, init, setTags } from '@sentry/browser';
import type { Client, ErrorEvent, Primitive } from '@sentry/core';

export function BrowserTrackingService(options?: BrowserOptions, metaData?: Record<string, Primitive>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions: BrowserOptions = {
    beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(event.user)) event.user = null as any;

      if (event.request) {
        // eslint-disable-next-line functional/immutable-data
        event.request = {
          ...event.request,
          url: HiddenField,
          headers: {
            ...event.request?.headers,
            url: HiddenField,
            Referer: HiddenField,
            referer: HiddenField
          }
        };

        delete (event.request.headers as any)?.Cookie;
        delete (event.request.headers as any)?.cookie;
      }

      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.geo) delete (event as any).contexts.geo;
      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.Geography) delete (event as any).contexts.Geography;
      // eslint-disable-next-line functional/immutable-data
      if ((event as any).contexts?.geography) delete (event as any).contexts.geography;

      // eslint-disable-next-line functional/immutable-data
      if (isDefined(event.breadcrumbs)) event.breadcrumbs = undefined;

      return scrubUserPathsBrowser(event);
    },
    integrations: [rewriteFramesIntegrationBrowser()],
    tracesSampleRate: 0,
    //Important: make sure this is false if you want anonymous reports (no IPs, etc. for GDPR and similar acts).
    sendDefaultPii: false
  };

  const client: Client | undefined = init({
    ...defaultOptions,
    ...options
  });

  if (isDefined(metaData)) setTags(metaData);
  setTags({
    layer: 'web',
    errorTracker: 'BrowserTrackingService'
  });

  const onError = (ev: any): void => void captureException(ev?.error ?? ev);
  const onRejection = (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent)?.reason ?? ev);

  function start(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    if (isStarted) return;
    isStarted = true;
    window.addEventListener('error', onErrorHandler);
    window.addEventListener('unhandledrejection', onRejectionHandler);
  }

  function stop(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    isStarted = false;
    window.removeEventListener('error', onErrorHandler);
    window.removeEventListener('unhandledrejection', onRejectionHandler);
  }

  if (isDefined(client)) start();

  return {
    captureException,
    start,
    stop,
    isStarted: () => isStarted
  };
}
