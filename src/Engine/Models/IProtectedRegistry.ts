import type { IAbstractRegistry } from '@Engine/Domains/Abstract/Models/IAbstractRegistry';
import type { IRegistrable } from '@Engine/Models/IRegistrable';

export type IProtectedRegistry<T extends IRegistrable, R extends IAbstractRegistry<T>> = R & Readonly<Omit<R, 'registry'>>;
