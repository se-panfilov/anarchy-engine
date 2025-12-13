import type { IMovable, IRotatable } from '@/Engine/Domains/Mixins';

export type IActorAccessors = IMovable &
  IRotatable &
  Readonly<{
    setCastShadow: (value: boolean) => boolean;
  }>;
