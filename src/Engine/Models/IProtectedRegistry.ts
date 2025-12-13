import type { IAbstractRegistry } from '@Engine/Models/IAbstractRegistry';
import type { IReactiveWrapper } from '@Engine/Models/IReactiveWrapper';

export type IProtectedRegistry<T extends IReactiveWrapper<unknown>, R extends IAbstractRegistry<T>> = Omit<
  R,
  'registry'
>;
