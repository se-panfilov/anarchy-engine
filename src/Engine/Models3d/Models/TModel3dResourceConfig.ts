import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TObject3DProps } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DProps>;
  }>;
