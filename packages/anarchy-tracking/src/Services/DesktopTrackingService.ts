import { isDefined } from '@Anarchy/Shared/Utils';
import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { TTrackingService } from '@Anarchy/Tracking/Models';
import { scrubUserPathsDesktop } from '@Anarchy/Tracking/Utils';
import type { ElectronMainOptions } from '@sentry/electron/esm/main';
import type { ErrorEvent, EventHint } from '@sentry/electron/main';
import { captureException, init } from '@sentry/electron/main';

export function DesktopTrackingService(options?: ElectronMainOptions, metaData?: Readonly<Record<string, unknown>>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions: ElectronMainOptions = {
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

      // eslint-disable-next-line functional/immutable-data
      (event as any).tags = { ...event.tags, ...metaData, errorTracker: 'DesktopTrackingService' };

      return scrubUserPathsDesktop(event);
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
    process.on('uncaughtException', onErrorHandler);
    process.on('unhandledRejection', onRejectionHandler);
  }

  function stop(onErrorHandler: (ev: any) => void = onError, onRejectionHandler: (ev: PromiseRejectionEvent) => void = onRejection): void {
    isStarted = false;
    process.off('uncaughtException', onErrorHandler);
    process.off('unhandledRejection', onRejectionHandler);
  }

  start();

  return {
    captureException,
    start,
    stop,
    isStarted: () => isStarted
  };
}
