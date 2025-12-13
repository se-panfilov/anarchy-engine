import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';

import type { TModel3dConfig } from './TModel3dConfig';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'url' | 'options'> &
  Readonly<{
    url: PrimitiveModel3dType | string;
    material?: string;
    options?: TModel3dConfig;
  }>;
