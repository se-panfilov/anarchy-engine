import type { TReactiveFactory } from '@/Abstract';

import type { TActor } from './TActor';
import type { TActorServiceDependencies } from './TActorDependencies';
import type { TActorParams } from './TActorParams';
import type { TParamsFromConfigActor } from './TParamsFromConfigActor';

export type TActorFactory = TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> & TParamsFromConfigActor;
