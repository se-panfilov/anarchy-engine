import type { ActorType } from '@/Engine/Actor/Constants';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithName } from '@/Engine/Mixins';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';

export type TActorProps = Readonly<{
  type: ActorType;
  castShadow: boolean;
  material: TMaterialPackParams<TMaterialTexturePack>;
}> &
  TBoxGeometryProps &
  TSphereGeometryProps &
  TPlaneGeometryProps &
  TWithName;
