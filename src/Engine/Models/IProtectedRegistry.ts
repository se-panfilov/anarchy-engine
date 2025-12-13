import type { IWrapper } from '@Engine/Models/IWrapper';
import type { IAbstractRegistry } from '@Engine/Models/IAbstractRegistry';

export type IProtectedRegistry<T extends IWrapper<unknown>> = Readonly<Omit<IAbstractRegistry<T>, 'registry'>>;
