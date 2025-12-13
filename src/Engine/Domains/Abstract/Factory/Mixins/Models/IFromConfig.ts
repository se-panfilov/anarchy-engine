import type { IFromConfigFn } from './IFromConfigFn';

export type IFromConfig<T, C> = Readonly<{
  fromConfig: IFromConfigFn<T, C>;
}>;
