import type { MeshToonMaterialParameters } from 'three';

import type { ActorTag, ActorType } from '@/Engine/Domains/Actor/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

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
}> &
  IWithReadonlyTags<ActorTag>;
