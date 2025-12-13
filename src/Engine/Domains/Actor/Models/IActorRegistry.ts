import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@Engine/Mixins';

import type { IActorWrapper } from './IActorWrapper';

export type IActorRegistry = IProtectedRegistry<IActorWrapper, IAbstractRegistry<IActorWrapper>>;
