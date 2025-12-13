import type { IVector3 } from '@/Engine/Wrappers';

export type IActorAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3;
  setX: (x: number) => number;
  setY: (y: number) => number;
  setZ: (z: number) => number;
  setCastShadow: (value: boolean) => boolean;
}>;
