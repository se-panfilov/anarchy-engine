import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IActorWrapper } from './IActorWrapper';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
