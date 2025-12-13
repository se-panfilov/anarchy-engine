import type { ActorLogic } from 'xstate';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

// TODO 9.3.0 STATE: fix any
export type TAnimationsFsmWrapper = TWrapper<ActorLogic<any, any>> & TDestroyable;
