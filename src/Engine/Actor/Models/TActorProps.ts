import type { ActorType } from '@/Engine/Actor/Constants';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithName } from '@/Engine/Mixins';

export type TActorProps = Readonly<{
  type: ActorType;
  width?: number;
  height?: number;
  depth?: number;
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
  castShadow: boolean;
  material: TMaterialPackParams<TMaterialTexturePack>;
}> &
  TWithName;
