import type { ActorTag } from '@Engine/Constants';
import type { IVector3 } from '@Engine/Models/IVector3';
import type { MeshToonMaterialParameters } from 'three';

export type IActorParams = Readonly<{
  type: IActorType;
  width?: number;
  height?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  materialParams?: MeshToonMaterialParameters;
  position: IVector3;
  rotation?: IVector3;
  castShadow: boolean;
  tags: ReadonlyArray<ActorTag>;
}>;

export type IActorType = 'sphere' | 'plane';
