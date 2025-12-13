import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TMaterialWrapper } from '@/Engine/Material';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams, TModel3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';
import { isPrimitiveModel3dData } from '@/Engine/Models3d/Utils';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TModel3dConfig, { materialRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dParams {
  const { position, rotation, materialSource, scale, ...rest } = config;

  const material: TMaterialWrapper | undefined = isDefined(materialSource) ? materialRegistry.findByName(materialSource) : undefined;

  return {
    ...rest,
    animationsSource: [],
    model3dSource: getModel3d(config, model3dResourceAsyncRegistry),
    materialSource: material,
    ...configToParamsObject3d({ position, rotation, scale })
  };
}

function getModel3d(config: TModel3dConfig, model3dResourceAsyncRegistry: TModel3dResourceAsyncRegistry): GLTF | PrimitiveModel3dType | never {
  let model3d: GLTF | PrimitiveModel3dType | undefined;
  if (isPrimitiveModel3dData(config)) {
    model3d = config.model3dSource as PrimitiveModel3dType;
  } else {
    model3d = isDefined(config.model3dSource) ? model3dResourceAsyncRegistry.findByKey(config.model3dSource) : undefined;
  }

  if (isNotDefined(model3d)) throw new Error(`Model3dConfigAdapter: model3dSource not found: ${config.model3dSource}`);

  return model3d;
}
