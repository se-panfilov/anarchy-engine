import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IRegistrable } from '@Engine/Mixins';

export type IProtectedRegistry<T extends IRegistrable, R extends IAbstractRegistry<T>> = Readonly<Omit<R, 'registry'>>;
