export type TDeferredPromise<T> = Readonly<{
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
  promise: Promise<T>;
}>;
