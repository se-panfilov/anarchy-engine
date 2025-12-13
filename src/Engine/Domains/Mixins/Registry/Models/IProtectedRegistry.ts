import type { IAbstractRegistry } from '@Engine/Domains/Abstract';

import type { IRegistrable } from '@/Engine/Domains/Mixins/Generic/Models';

export type IProtectedRegistry<T extends IRegistrable, R extends IAbstractRegistry<T>> = Readonly<Omit<R, 'registry'>>;
