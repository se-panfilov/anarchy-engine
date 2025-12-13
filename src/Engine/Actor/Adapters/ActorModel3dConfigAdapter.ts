import type { TActorModel3dConfig, TActorModel3dParams } from '@/Engine/Actor/Models';
import { model3dConfigToParams } from '@/Engine/Models3d/Adapters';
import type { TModel3dConfig } from '@/Engine/Models3d/Models';

export function actorConfigToParams(config: TActorModel3dConfig): TActorModel3dParams {
  return model3dConfigToParams(config as TModel3dConfig);
}
