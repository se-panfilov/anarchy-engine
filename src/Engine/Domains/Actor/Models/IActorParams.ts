import type { IEulerWrapper, IVector3Wrapper } from '@Engine/Wrappers';
import type { MeshToonMaterialParameters } from 'three';

import type { CommonTag } from '@/Engine/Domains/Abstract';

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
  position: IVector3Wrapper;
  rotation?: IEulerWrapper;
  castShadow: boolean;
  tags: ReadonlyArray<ActorTag | CommonTag | string>;
}>;
