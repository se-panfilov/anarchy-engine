import { isDefined, parseDistName } from '@Anarchy/Shared/Utils';
import type { TMetaData, TTrackingService } from '@Anarchy/Tracking/Models';
import { rewriteFramesIntegrationNode } from '@Anarchy/Tracking/Utils/IntegrationsNode';
import { scrubEvent } from '@Anarchy/Tracking/Utils/ScrubEvent';
import { scrubUserPathsDesktop } from '@Anarchy/Tracking/Utils/ScrubsDesktop';
import type { ElectronMainOptions } from '@sentry/electron/esm/main';
import type { ErrorEvent, EventHint } from '@sentry/electron/main';
import { captureException, init, setTags } from '@sentry/electron/main';

export function DesktopTrackingService(options?: ElectronMainOptions, metaData?: TMetaData, dynamicDataFn?: () => Record<string, any>): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions: ElectronMainOptions = {
    beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
      const result: ErrorEvent = scrubUserPathsDesktop(scrubEvent(event as any) as ErrorEvent);
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(dynamicDataFn)) result.contexts = { ...(result.contexts ?? {}), extra: dynamicDataFn() };
      return result;
    },
    integrations: [rewriteFramesIntegrationNode()],
    tracesSampleRate: 0,
    //Important: make sure this is false if you want anonymous reports (no IPs, etc. for GDPR and similar acts).
    sendDefaultPii: false
  };

  init({
    ...defaultOptions,
    ...options
  });

  if (isDefined(metaData)) setTags(metaData);
  const { platform, arch } = parseDistName(options?.dist);
  setTags({
    layer: 'electron-main',
    errorTracker: 'DesktopTrackingService',
    os: platform,
    arch
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
