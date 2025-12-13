import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@Engine/Animations';
import type { PrimitiveModel3dType } from '@Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams, TModels3dResourceAsyncRegistry } from '@Engine/Models3d/Models';
import { isPrimitiveModel3dData } from '@Engine/Models3d/Utils';
import { configToParamsObject3d } from '@Engine/ThreeLib';
import { isDefined, isNotDefined } from '@Shared/Utils';
import type { AnimationClip } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function configToParams(config: TModel3dConfig, { animationsResourceAsyncRegistry, materialRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dParams {
  const { position, rotation, material, scale, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale }),
    animationsSource: getAnimationsSource(config, animationsResourceAsyncRegistry),
    model3dSource: getModel3d(config, model3dResourceAsyncRegistry),
    material: isDefined(material) ? materialRegistry.getByName(material) : undefined
  };
}

function getModel3d(config: TModel3dConfig, model3dResourceAsyncRegistry: TModels3dResourceAsyncRegistry): GLTF | PrimitiveModel3dType | never {
  let model3d: GLTF | PrimitiveModel3dType | undefined;
  if (isPrimitiveModel3dData(config)) {
    model3d = config.model3dSource as PrimitiveModel3dType;
  } else {
    model3d = isDefined(config.model3dSource) ? model3dResourceAsyncRegistry.getByKey(config.model3dSource) : undefined;
  }

  if (isNotDefined(model3d)) throw new Error(`Model3dConfigAdapter: model3dSource not found: ${config.model3dSource}`);

  return model3d;
}

function getAnimationsSource(config: TModel3dConfig, animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry): ReadonlyArray<AnimationClip> | never {
  let animations: ReadonlyArray<AnimationClip> = [];
  if (isDefined(config.animationsSource)) {
    config.animationsSource.forEach((source: string): void => {
      const loaded: TAnimations = animationsResourceAsyncRegistry.getByKey(source);
      animations = [...animations, ...loaded];
    });
  }

  return animations;
}
