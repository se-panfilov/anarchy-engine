import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithName } from '@/Engine/Mixins';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';

export type TActorProps = Readonly<{
  castShadow: boolean;
  receiveShadow: boolean;
  material: TMaterialPackParams<TMaterialTexturePack>;
}> &
  TBoxGeometryProps &
  TSphereGeometryProps &
  TPlaneGeometryProps &
  TWithName;
