import { isDefined, parseDistName } from '@Anarchy/Shared/Utils';
import type { TMetaData, TTrackingService } from '@Anarchy/Tracking/Models';
import { rewriteFramesIntegrationBrowser } from '@Anarchy/Tracking/Utils/IntegrationsBrowser';
import { scrubEvent } from '@Anarchy/Tracking/Utils/ScrubEvent';
import { scrubUserPathsBrowser } from '@Anarchy/Tracking/Utils/ScrubsBrowser';
import type { Integration } from '@sentry/core';
import type { ErrorEvent, EventHint } from '@sentry/electron/renderer';
import { captureException, init, setTags } from '@sentry/electron/renderer';

export function DesktopPreloadTrackingService(options?: Record<string, any>, metaData?: TMetaData): TTrackingService {
  let isStarted: boolean = false;

  const defaultOptions = {
    beforeSend(event: ErrorEvent, _hint: EventHint): PromiseLike<ErrorEvent | null> | ErrorEvent | null {
      return scrubUserPathsBrowser(scrubEvent(event as any)) as ErrorEvent;
    },
    integrations: [rewriteFramesIntegrationBrowser() as () => Integration],
    tracesSampleRate: 0,
    //Important: make sure this is false if you want anonymous reports (no IPs, etc. for GDPR and similar acts).
    sendDefaultPii: false
  };

  init({
    ...defaultOptions,
    ...options
  });

  if (isDefined(metaData)) setTags(metaData);
  const { platform, arch } = parseDistName(metaData?.dist);
  setTags({
    layer: 'electron-preload',
    initLayer: 'electron-preload',
    errorTracker: 'DesktopPreloadTrackingService',
    errorTrackerInitializer: 'DesktopPreloadTrackingService',
    os: platform,
    arch: arch
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
