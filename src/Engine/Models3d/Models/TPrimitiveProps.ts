import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';

// TODO 9.0.0. RESOURCES: Remove this one, but make use of TBoxGeometryProps/TSphereGeometryProps/TPlaneGeometryProps
export type TPrimitiveProps = Readonly<{
  type: PrimitiveModel3dType;
}> &
  TBoxGeometryProps &
  TSphereGeometryProps &
  TPlaneGeometryProps;
