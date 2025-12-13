import { isDefined } from '@Anarchy/Shared/Utils';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import type { EventHint } from '@sentry/browser';
import type { Client } from '@sentry/core';
import type { ElectronMainOptions } from '@sentry/electron';
import { captureException, init } from '@sentry/electron';

export function ElectronTrackingService(options?: ElectronMainOptions, metaData?: Readonly<Record<string, unknown>>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions = {
    beforeSend(event: SentryEvent, _hint: EventHint) {
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

  const client: Client | undefined = init({
    ...defaultOptions,
    ...options
  });

  const onError = (ev: any): void => void captureException(ev.error ?? ev);
  const onRejection = (ev: PromiseRejectionEvent): void => void captureException((ev as PromiseRejectionEvent).reason ?? ev);

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

  // if (isRenderer && typeof window !== 'undefined') {
  //     window.addEventListener('error', onWindowError);
  //     window.addEventListener('unhandledrejection', onWindowRejection as any);
  //   } else if (isMain) {
  //     process.on('uncaughtException', onProcessUncaught as any);
  //     process.on('unhandledRejection', onProcessRejection as any);
  //   } else {
  //     // На всякий случай — если кто-то вызвал в неизвестной среде
  //     // ничего не делаем; captureException всё равно доступен вручную.
  //   }

  function stop(): void {
    isStarted = false;
    window.removeEventListener('error', onErrorHandler);
    window.removeEventListener('unhandledrejection', onRejectionHandler);

    // if (isRenderer && typeof window !== 'undefined') {
    //   window.removeEventListener('error', onWindowError);
    //   window.removeEventListener('unhandledrejection', onWindowRejection as any);
    // } else if (isMain) {
    //   process.off?.('uncaughtException', onProcessUncaught as any);
    //   process.off?.('unhandledRejection', onProcessRejection as any);
    //   // (для старых Node можно использовать removeListener)
    // }
  }

  if (isDefined(client)) start();

  return {
    client,
    captureException,
    start,
    stop,
    isStarted: () => isStarted
  };
}
