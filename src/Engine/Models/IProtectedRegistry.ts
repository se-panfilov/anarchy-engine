import type { IAbstractRegistry } from '@/Engine/Models/IAbstractRegistry';
import type { IRegistrable } from '@Engine/Models/IRegistrable';

export type IProtectedRegistry<T extends IRegistrable> = Readonly<Omit<IAbstractRegistry<T>, 'registry'>>;
