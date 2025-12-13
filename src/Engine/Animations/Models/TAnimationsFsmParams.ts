import type { TWithNameOptional } from '@/Engine/Mixins';

export type TAnimationsFsmParams = Readonly<{
  initial: string | number | symbol;
  transitions: ReadonlyArray<Readonly<[string | number | symbol, string | number | symbol, string | number | symbol]>>;
}> &
  TWithNameOptional;
