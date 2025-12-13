import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TModel3dConfig } from './TModel3dConfig';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    material?: string;
    options?: TModel3dConfig;
  }>;
