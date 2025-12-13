export function createDeferredPromise<T>(): DeferredPromise<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reject: (reason?: any) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promise: Promise<T> = new Promise(
    (res: (value: T | PromiseLike<T>) => void, rej: (reason?: any) => void): void => {
      resolve = res;
      reject = rej;
    }
  );

  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    resolve: resolve!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reject: reject!,
    promise
  };
}

export interface DeferredPromise<T> {
  readonly resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly reject: (reason?: any) => void;
  readonly promise: Promise<T>;
}
