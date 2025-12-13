import type { IAbstractRegistry } from '@/Engine/Models/IAbstractRegistry';
import type { IRegistrableEntity } from '@/Engine/Models/IRegistrableEntity';

export type IProtectedRegistry<T extends IRegistrableEntity> = Readonly<Omit<IAbstractRegistry<T>, 'registry'>>;
