import type { IVector3 } from '@Engine/Wrappers';
import type { MeshToonMaterialParameters } from 'three';

import type { CommonTags } from '@/Engine/Domains/Abstract';

import type { ActorTag, ActorType } from '../Constants';

export type IActorParams = Readonly<{
  type: ActorType;
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
  materialParams?: MeshToonMaterialParameters;
  position: IVector3;
  rotation?: IVector3;
  castShadow: boolean;
  tags: ReadonlyArray<ActorTag | CommonTags | string>;
}>;
