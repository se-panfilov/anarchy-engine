import { isDefined } from '@Anarchy/Shared/Utils';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { EventHint } from '@sentry/browser';
import type { ErrorEvent } from '@sentry/core';
import type { ElectronMainOptions } from '@sentry/electron/esm/main';
import { captureException, init } from '@sentry/electron/renderer';

export function ElectronTrackingService(options?: ElectronMainOptions, metaData?: Readonly<Record<string, unknown>>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions: ElectronMainOptions = {
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

      // eslint-disable-next-line functional/immutable-data
      (event as any).tags = { ...event.tags, ...metaData };

      return event;
    },
    tracesSampleRate: 0,
    //Important: make sure this is false if you want Anonymous reports (no IPs, etc.).
    sendDefaultPii: false
  };

  init({
    ...defaultOptions,
    ...options
  });

  const onError = (ev: any): void => void captureException(ev?.error ?? ev);
  const onRejection = (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent)?.reason ?? ev);

  function start(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    if (isStarted) return;
    isStarted = true;
    globalThis.window?.addEventListener?.('error', onErrorHandler);
    globalThis.process?.on?.('uncaughtException', onErrorHandler);
    globalThis.window?.addEventListener?.('unhandledrejection', onRejectionHandler);
    globalThis.process?.on?.('unhandledRejection', onRejectionHandler);
  }

  function stop(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    isStarted = false;
    globalThis.window?.removeEventListener?.('error', onErrorHandler);
    globalThis.process?.off?.('uncaughtException', onErrorHandler);
    globalThis.window?.removeEventListener?.('unhandledrejection', onRejectionHandler);
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
