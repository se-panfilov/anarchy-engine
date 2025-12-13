export function createDeferredPromise<T>(): TDeferredPromise<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;

  const promise: Promise<T> = new Promise((res: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void): void => {
    resolve = res;
    reject = rej;
  });

  return {
    resolve: resolve!,
    reject: reject!,
    promise
  };
}

export type TDeferredPromise<T> = Readonly<{
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
  promise: Promise<T>;
}>;
