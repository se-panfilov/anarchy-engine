export function createDeferredPromise<T>(): TDeferredPromise<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reject: (reason?: any) => void;

  const promise: Promise<T> = new Promise(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export type TDeferredPromise<T> = Readonly<{
  resolve: (value: T | PromiseLike<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
  promise: Promise<T>;
}>;
