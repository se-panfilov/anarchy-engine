import type { IVector3 } from '@Engine/Wrappers';
import type { MeshToonMaterialParameters } from 'three';

import type { ActorTag } from '../Constants';

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
