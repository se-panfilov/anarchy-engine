import type { TActorConfig, TActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { spatialConfigToParams } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TActorConfig): TActorParams {
  const { position, rotation, layers, animations, scale, material, physics, spatial, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  const spatialParams = isDefined(spatial) ? spatialConfigToParams(spatial) : undefined;

  return {
    ...rest,
    spatial: spatialParams,
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
