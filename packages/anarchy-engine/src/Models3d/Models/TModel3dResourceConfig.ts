import type { TAbstractResourceConfig } from '@hellpig/anarchy-engine/Abstract';
import type { TObject3DPropConfig } from '@hellpig/anarchy-engine/ThreeLib';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DPropConfig>;
  }>;
