import type { IVector3 } from '@/Engine/Wrappers/Vector3Wrapper';

export type IActorAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3;
  setCastShadow: (value: boolean) => boolean;
}>;
