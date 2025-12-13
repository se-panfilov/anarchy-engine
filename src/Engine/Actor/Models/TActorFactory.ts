import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TActor } from './TActor';
import type { TActorServiceDependencies } from './TActorDependencies';
import type { TActorParams } from './TActorParams';
import type { TParamsFromConfigActor } from './TParamsFromConfigActor';

export type TActorFactory = TReactiveFactoryWithDependencies<TActor, TActorParams, TActorServiceDependencies> & TParamsFromConfigActor & TDestroyable;
