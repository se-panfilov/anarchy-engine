import type { TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TObject3DProps } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: Not sure if "options" needed (used to store scale, position, etc.)
export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DProps>;
  }>;
