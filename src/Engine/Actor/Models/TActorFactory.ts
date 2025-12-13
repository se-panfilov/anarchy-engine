import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TActorServiceDependencies } from './TActorDependencies';
import type { TActorParams } from './TActorParams';
import type { TActorWrapper } from './TActorWrapper';
import type { TParamsFromConfigActor } from './TParamsFromConfigActor';

export type TActorFactory = TReactiveFactoryWithDependencies<TActorWrapper, TActorParams, TActorServiceDependencies> & TParamsFromConfigActor & TDestroyable;
