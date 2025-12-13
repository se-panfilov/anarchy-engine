import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TModel3dOptions } from './TModel3dOptions';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TModel3dOptions;
  }>;
