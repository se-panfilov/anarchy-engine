import type { ActorType } from '@/Engine/Actor/Constants';
import type { IMaterialPackParams, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithName } from '@/Engine/Mixins';

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
  material: IMaterialPackParams<IMaterialTexturePack>;
}> &
  IWithName;
