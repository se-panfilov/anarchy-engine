import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dConfig = Omit<TModel3dParams, 'scale' | 'position' | 'rotation' | 'animationsSource' | 'model3dSource' | 'material'> &
  Readonly<{
    model3dSource: string | PrimitiveModel3dType;
    animationsSource?: ReadonlyArray<string>;
    material?: string;
  }> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>>;
