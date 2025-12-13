import type { IMovable, IRotatable } from '@/Engine/Mixins';

export type IActorAccessors = IMovable &
  IRotatable &
  Readonly<{
    setCastShadow: (value: boolean) => boolean;
  }>;
