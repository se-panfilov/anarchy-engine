import type { TAbstractResourceConfig } from '@Engine/Abstract';
import type { TObject3DPropConfig } from '@Engine/ThreeLib';
import type { TOptional } from '@Shared/Utils';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DPropConfig>;
  }>;
