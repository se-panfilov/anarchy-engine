import type { MeshToonMaterialParameters } from 'three';

import type { ActorType } from '@/Engine/Domains/Actor/Constants';

export type IActorProps = Readonly<{
  type: ActorType;
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
  materialParams?: MeshToonMaterialParameters;
  castShadow: boolean;
}>;
