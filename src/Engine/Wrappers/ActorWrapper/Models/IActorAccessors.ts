import type { Vector3 } from 'three';

export type IActorAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => Vector3;
  setCastShadow: (value: boolean) => boolean;
}>;
