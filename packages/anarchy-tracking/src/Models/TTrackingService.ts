export type TTrackingService = Readonly<{
  captureException: (exception: unknown, hint?: any) => string;
  start: (onErrorHandler?: (ev: any) => void, onRejectionHandler?: (ev: PromiseRejectionEvent) => void) => void;
  stop: (onErrorHandler?: (ev: any) => void, onRejectionHandler?: (ev: PromiseRejectionEvent) => void) => void;
  isStarted: () => boolean;
}>;
