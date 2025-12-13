import type { IActorConfig, IActorParams } from '@/Engine/Actor/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IActorConfig): IActorParams {
  const { position, rotation, layers, animations, scale, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
