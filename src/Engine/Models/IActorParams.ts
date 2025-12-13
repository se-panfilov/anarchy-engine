import type { MeshToonMaterialParameters, Vector3 } from 'three';

export type IActorParams = Readonly<{
  type: IActorType;
  width?: number;
  height?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  materialParams?: MeshToonMaterialParameters;
  position: Vector3;
  rotation?: Vector3;
  castShadow: boolean;
}>;

export type IActorType = 'sphere' | 'plane';
