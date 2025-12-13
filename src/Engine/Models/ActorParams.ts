import { MeshToonMaterialParameters } from 'three/src/materials/MeshToonMaterial';

export interface ActorParams {
  readonly type: ActorType;
  readonly width?: number;
  readonly height?: number;
  readonly radius?: number;
  readonly widthSegments?: number;
  readonly heightSegments?: number;
  readonly materialParams?: MeshToonMaterialParameters;
}

export type ActorType = 'sphere' | 'plane';
