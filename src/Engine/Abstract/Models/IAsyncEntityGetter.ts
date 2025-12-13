export type IAsyncEntityGetter<T> = Readonly<{ promise: Promise<T>; stop: () => void }>;
