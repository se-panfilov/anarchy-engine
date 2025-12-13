import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TOptional } from '@/Engine/Utils';

export type TActorModel3dConfig = Readonly<{
  // TODO 8.0.0. MODELS: check name match model's in config
  // TODO 8.0.0. MODELS: allow to override model3d preset's here in config
  model3d: Readonly<{
    presetName: string;
  }> &
    TOptional<TModel3dConfig>;
}>;
