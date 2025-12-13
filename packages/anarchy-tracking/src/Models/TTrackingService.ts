import type { Client } from '@sentry/core';
import type { ExclusiveEventHintOrCaptureContext } from '@sentry/core/build/types/utils/prepareEvent';

export type TTrackingService = Readonly<{
  client: Client | undefined;
  captureException: (exception: unknown, hint?: ExclusiveEventHintOrCaptureContext) => string;
  start: (onErrorHandler: (ev: any) => void, onRejectionHandler: (ev: PromiseRejectionEvent) => void) => void;
  stop: (onErrorHandler: (ev: any) => void, onRejectionHandler: (ev: PromiseRejectionEvent) => void) => void;
}>;
