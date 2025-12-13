import type { QuaternionLike, Vector3Like } from 'three';

export type TSerializedTransform = Readonly<{
  position: Vector3Like;
  rotation: QuaternionLike;
  scale: Vector3Like;
}>;
