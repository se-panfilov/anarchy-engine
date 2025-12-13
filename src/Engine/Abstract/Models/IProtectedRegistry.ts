import type { IAbstractRegistry } from '@/Engine/Abstract';
import type { IRegistrable } from '@/Engine/Mixins/Generic/Models';

export type IProtectedRegistry<T extends IRegistrable, R extends IAbstractRegistry<T>> = Readonly<Omit<R, 'registry'>>;
