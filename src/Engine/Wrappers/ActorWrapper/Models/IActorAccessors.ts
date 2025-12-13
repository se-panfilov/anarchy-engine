import type { IVector3 } from '@Engine/Models';

export type IActorAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3;
  setCastShadow: (value: boolean) => boolean;
}>;
