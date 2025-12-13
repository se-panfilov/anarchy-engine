import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dProps } from './TModel3dProps';

export type TModel3dConfig = Readonly<{
  model3dSource: string | PrimitiveModel3dType;
  animationsSource?: ReadonlyArray<string>;
  materialSource?: string;
}> &
  Omit<TModel3dProps, 'scale' | 'position' | 'rotation'> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>>;
