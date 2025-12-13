import type { TActorConfig, TActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { configToParamsPreset } from '@/Engine/Physics';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: TActorConfig): TActorParams {
  const { position, rotation, layers, animations, scale, material, physics, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  return {
    ...rest,
    physics: physics ? configToParamsPreset(physics) : {},
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
