import type { IMovable, IRotatable, IScalable } from '@/Engine/Mixins';

export type IActorAccessors = IMovable &
  IRotatable &
  IScalable &
  Readonly<{
    setCastShadow: (value: boolean) => boolean;
  }>;
