import type { TAnimationStateConfig } from '@/Animations';
import type { PrimitiveModel3dType } from '@/Models3d/Constants';
import type { TObject3DPropConfig } from '@/ThreeLib';
import type { TOptional } from '@/Utils';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dConfig = Omit<TModel3dParams, 'scale' | 'position' | 'rotation' | 'animationsSource' | 'model3dSource' | 'material' | 'animationsState'> &
  Readonly<{
    model3dSource: string | PrimitiveModel3dType;
    animationsSource?: ReadonlyArray<string>;
    animationsState?: ReadonlyArray<TAnimationStateConfig>;
    material?: string;
  }> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>>;
