export function createDeferredPromise<T>(): DeferredPromise<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise((res: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void) => {
    resolve = res;
    reject = rej;
  });

  return {
    resolve: resolve!,
    reject: reject!,
    promise
  };
}

export interface DeferredPromise<T> {
  readonly resolve: (value: T | PromiseLike<T>) => void;
  readonly reject: (reason?: any) => void;
  readonly promise: Promise<T>;
}
