import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { IProtectedRegistry } from '@Engine/Mixins';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
