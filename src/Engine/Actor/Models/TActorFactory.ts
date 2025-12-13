import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TActorParams } from './TActorParams';
import type { TActorWrapper } from './TActorWrapper';
import type { TParamsFromConfigActor } from './TParamsFromConfigActor';

export type TActorFactory = TReactiveFactory<TActorWrapper, TActorParams> & TParamsFromConfigActor & TDestroyable;
