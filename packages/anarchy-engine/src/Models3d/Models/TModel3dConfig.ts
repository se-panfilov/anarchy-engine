import type { TAnimationStateConfig } from '@Anarchy/Engine/Animations';
import type { PrimitiveModel3dType } from '@Anarchy/Engine/Models3d/Constants';
import type { TObject3DPropConfig } from '@Anarchy/Engine/ThreeLib';
import type { TOptional } from '@Shared/Utils';

import type { TModel3dParams } from './TModel3dParams';

export type TModel3dConfig = Omit<TModel3dParams, 'scale' | 'position' | 'rotation' | 'animationsSource' | 'model3dSource' | 'material' | 'animationsState'> &
  Readonly<{
    model3dSource: string | PrimitiveModel3dType;
    animationsSource?: ReadonlyArray<string>;
    animationsState?: ReadonlyArray<TAnimationStateConfig>;
    material?: string;
  }> &
  TOptional<Pick<TObject3DPropConfig, 'position' | 'scale' | 'rotation'>>;
