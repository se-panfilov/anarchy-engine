import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TOptional } from '@/Engine/Utils';

import type { TAudioResourceOptions } from './TAudioResourceOptions';

export type TAudioResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TAudioResourceOptions>;
  }>;
