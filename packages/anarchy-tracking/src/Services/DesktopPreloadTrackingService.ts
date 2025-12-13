import { isDefined } from '@Anarchy/Shared/Utils';
import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import { scrubUserPathsBrowser } from '@Anarchy/Tracking/Utils';
import type { Primitive } from '@sentry/core';
import type { ErrorEvent, EventHint } from '@sentry/electron/renderer';
import { captureException, init, setTags } from '@sentry/electron/renderer';

export function DesktopPreloadTrackingService(options?: Record<string, any>, metaData?: Readonly<Record<string, Primitive>>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions = {
    beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
      // eslint-disable-next-line functional/immutable-data
      if (!event.user) event.user = null as any;

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
      if (!event.breadcrumbs) event.breadcrumbs = undefined;

      return scrubUserPathsBrowser(event as any) as ErrorEvent;
    },
    // integrations: [rewriteFramesIntegrationBrowser()],
    tracesSampleRate: 0,
    //Important: make sure this is false if you want anonymous reports (no IPs, etc. for GDPR and similar acts).
    sendDefaultPii: false
  };

  init({
    ...defaultOptions,
    ...options
  });

  if (isDefined(metaData)) setTags(metaData);
  setTags({
    layer: 'electron-preload',
    initLayer: 'electron-preload',
    errorTracker: 'DesktopPreloadTrackingService',
    errorTrackerInitializer: 'DesktopPreloadTrackingService'
  });

  const onError = (ev: any): void => void captureException(ev?.error ?? ev);
  const onRejection = (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent)?.reason ?? ev);

  function start(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    if (isStarted) return;
    isStarted = true;

    globalThis.window?.addEventListener?.('error', onErrorHandler);
    globalThis.window?.addEventListener?.('unhandledrejection', onRejectionHandler);
    globalThis.process?.on?.('uncaughtException', onErrorHandler);
    globalThis.process?.on?.('unhandledRejection', onRejectionHandler);
  }

  function stop(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    isStarted = false;
    globalThis.window?.removeEventListener?.('error', onErrorHandler);
    globalThis.window?.removeEventListener?.('unhandledrejection', onRejectionHandler);
    globalThis.process?.off?.('uncaughtException', onErrorHandler);
    globalThis.process?.off?.('unhandledRejection', onRejectionHandler);
  }

  start();

  return {
    captureException,
    start,
    stop,
    isStarted: () => isStarted
  };
}
