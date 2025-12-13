import type { MeshToonMaterialParameters, Vector3 } from 'three';

export interface IActorParams {
  readonly type: ActorType;
  readonly width?: number;
  readonly height?: number;
  readonly radius?: number;
  readonly widthSegments?: number;
  readonly heightSegments?: number;
  readonly materialParams?: MeshToonMaterialParameters;
  readonly position: Vector3;
  readonly rotation?: Vector3;
  readonly castShadow: boolean;
}

export type ActorType = 'sphere' | 'plane';
