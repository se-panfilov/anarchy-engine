import type { TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';
import type { TObject3DPropConfig } from '@Anarchy/Engine/ThreeLib';
import type { TOptional } from '@Anarchy/Shared/Utils';

export type TModel3dResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TOptional<TObject3DPropConfig>;
  }>;
