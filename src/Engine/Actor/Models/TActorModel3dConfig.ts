import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TOptional } from '@/Engine/Utils';

export type TActorModel3dConfig = Readonly<{
  // TODO 8.0.0. MODELS: check name match model's in config
  // TODO 9.0.0. RESOURCES: Maybe no need in overrides, just create a new instance of a resource
  model3d: Readonly<{
    presetName: string;
  }> &
    TOptional<TModel3dConfig>;
}>;
