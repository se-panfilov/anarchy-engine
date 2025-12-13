import type { Group, Mesh, Object3D } from 'three';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams } from '@/Engine/Models3d/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TModel3dConfig, { materialRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dParams {
  const { position, rotation, materialSource, model3dSource, scale, ...rest } = config;

  const material: TMaterialWrapper | undefined = isDefined(materialSource) ? materialRegistry.findByName(materialSource) : undefined;
  // TODO CWP !!!
  // TODO 9.0.0. RESOURCES: async registry is a pain here, cause returns Promise, but we need to return the value
  const model3d: Group | Mesh | Object3D | undefined = isDefined(model3dSource) ? model3dResourceAsyncRegistry.findByKeyAsync(model3dSource) : undefined;
  if (isNotDefined(model3d)) throw new Error(`Model3dConfigAdapter: model3dSource not found: ${model3dSource}`);

  return {
    ...rest,
    // TODO 9.0.0. RESOURCES: implement animations loading in resources (shall animations be loaded separately from models?)
    animationsSource: [],
    model3dSource: model3d,
    materialSource: material,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}
