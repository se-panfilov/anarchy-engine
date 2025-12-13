import type { IRegistrable } from '@Engine/Models/IRegistrable';

import type { IAbstractRegistry } from '@/Engine/Models/IAbstractRegistry';

export type IProtectedRegistry<T extends IRegistrable> = Readonly<Omit<IAbstractRegistry<T>, 'registry'>>;
