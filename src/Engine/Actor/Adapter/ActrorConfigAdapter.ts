import type { IActorConfig, IActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapter';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: IActorConfig): IActorParams {
  const { position, rotation, layers, animations, scale, material, ...rest } = config;

  return {
    ...rest,
    material: materialConfigToParams({ ...material.params, type: material.type }),
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
