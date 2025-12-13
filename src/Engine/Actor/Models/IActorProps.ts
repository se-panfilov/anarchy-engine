import type { ActorType } from '@/Engine/Actor/Constants';
import type { IMaterialProps } from '@/Engine/Material';

export type IActorProps = Readonly<{
  type: ActorType;
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
  castShadow: boolean;
  material: IMaterialProps;
}>;
