import type { TAbstractResourceConfig } from '@/Abstract';
import type { TObject3DPropConfig } from '@/ThreeLib';
import type { TOptional } from '@/Utils';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DPropConfig>;
  }>;
