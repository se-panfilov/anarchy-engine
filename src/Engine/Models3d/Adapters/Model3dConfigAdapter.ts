import type { Group, Mesh, Object3D } from 'three';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams } from '@/Engine/Models3d/Models';
import { isPrimitiveModel3dData } from '@/Engine/Models3d/Utils';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TModel3dConfig, { materialRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dParams {
  const { position, rotation, materialSource, model3dSource, scale, ...rest } = config;

  const material: TMaterialWrapper | undefined = isDefined(materialSource) ? materialRegistry.findByName(materialSource) : undefined;
  let model3d: Group | Mesh | Object3D | PrimitiveModel3dType | undefined;

  if (isPrimitiveModel3dData(config)) {
    model3d = config.model3dSource as PrimitiveModel3dType;
  } else {
    model3d = isDefined(model3dSource) ? model3dResourceAsyncRegistry.findByKey(model3dSource) : undefined;
  }

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
