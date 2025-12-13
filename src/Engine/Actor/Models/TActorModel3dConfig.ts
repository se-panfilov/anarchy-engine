import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TOptional } from '@/Engine/Utils';

export type TActorModel3dConfig = Readonly<{
  // TODO MODELS: check name match model's in config
  // TODO MODELS: allow to override model3d preset's here in config
  model3d: Readonly<{
    presetName: string;
  }> &
    TOptional<TModel3dConfig>;
}>;
