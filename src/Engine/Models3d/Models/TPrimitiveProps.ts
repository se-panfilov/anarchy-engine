import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';

export type TPrimitiveProps = Readonly<{
  type: PrimitiveModel3dType;
}> &
  TBoxGeometryProps &
  TSphereGeometryProps &
  TPlaneGeometryProps;
