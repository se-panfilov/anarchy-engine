import type { TActorConfig, TActorConfigToParamsDependencies, TActorParams } from '@/Engine/Actor/Models';
import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { configToOptionalParamsBody } from '@/Engine/Physics';
import { configToParamsSpatialData } from '@/Engine/Spatial';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function configToParamsAsync(config: TActorConfig, dependencies: TActorConfigToParamsDependencies): Promise<TActorParams> {
  const { position, rotation, layers, animations, scale, material, physics, spatial, model3dName, ...rest } = config;
  const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });

  const model3d = isDefined(model3dName) ? await dependencies.models3dRegistry.findByNameAsync(model3dName) : undefined;

  return {
    ...rest,
    model3d,
    spatial: configToParamsSpatialData(spatial, dependencies),
    physics: physics ? configToOptionalParamsBody(physics) : undefined,
    material: { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
