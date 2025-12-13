import type { IAbstractRegistry } from '@Engine/Models/IAbstractRegistry';
import type { IWrapper } from '@Engine/Models/IWrapper';

export type IProtectedRegistry<T extends IWrapper<unknown>, R extends IAbstractRegistry<T>> = Omit<R, 'registry'>;
