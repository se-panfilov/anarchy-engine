import type { TWithNameOptional } from '@/Engine/Mixins';

export type TStatesFsm = string | number | symbol;
export type TEventsFsm = string | number | symbol;

export type TAnimationsFsmParams = Readonly<{
  initial: TStatesFsm;
  transitions: ReadonlyArray<Readonly<[TStatesFsm, TEventsFsm, TStatesFsm]>>;
}> &
  TWithNameOptional;
