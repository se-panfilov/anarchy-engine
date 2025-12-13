import type { TWithNameOptional } from '@/Engine/Mixins';

// TODO 9.3.0 STATE: fix state (extend)
export type TAnimationsFsmParams = Readonly<{
  id: string;
  initial: string;
  states: TAnimationState;
}> &
  TWithNameOptional;

// TODO 9.3.0 STATE: fix state (extend)
export type TAnimationState = Record<string, string>;
