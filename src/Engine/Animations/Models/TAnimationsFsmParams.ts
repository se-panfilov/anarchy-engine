import type { EventObject, MachineContext, MetaObject, NonReducibleUnknown, ParameterizedObject, ProvidedActor, StatesConfig } from 'xstate';

import type { TWithNameOptional } from '@/Engine/Mixins';

export type TAnimationsFsmParams = Readonly<{
  id: string;
  initial: string;
  states: TAnimationState;
}> &
  TWithNameOptional;

export type TAnimationState = StatesConfig<MachineContext, any, ProvidedActor, ParameterizedObject, ParameterizedObject, string, string, NonReducibleUnknown, EventObject, MetaObject>;
