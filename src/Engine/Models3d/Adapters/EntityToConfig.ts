import type { AnimationClip } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@/Engine/Animations/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { PrimitiveModel3dType } from '@/Engine/Models3d/Constants';
import type { TModel3d, TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams, TModels3dResourceAsyncRegistry, TRawModel3d } from '@/Engine/Models3d/Models';
import { isPrimitiveModel3dSource } from '@/Engine/Models3d/Utils';
import { filterOutEmptyFields, isDefined, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function model3dToConfig(entity: TModel3d, { animationsResourceAsyncRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dConfig {
  // TODO 15-0-0: make sure working with Primitive models
  // TODO 15-0-0: make sure working with complex uploaded models
  // TODO 15-0-0: make sure working with cloned models
  // TODO 15-0-0: make sure working with animations
  // TODO 15-0-0: make sure working with materials

  const rawModel3d: TRawModel3d = entity.getRawModel3d();

  const params: TModel3dParams = entity.getParams();
  const isPrimitive: boolean = isPrimitiveModel3dSource(params.model3dSource);

  const model3dSource: string | undefined = isPrimitive ? (params.model3dSource as PrimitiveModel3dType) : getComplexModel3dSource(entity, model3dResourceAsyncRegistry);
  if (isNotDefined(model3dSource)) throw new Error(`[Serialization] Model3d: model3dSource not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const materialSource: string | undefined = isDefined(params.materialSource) ? params.materialSource.name : undefined;

  return filterOutEmptyFields({
    model3dSource,
    materialSource,
    animationsSource: getAllAnimationsSource(entity, animationsResourceAsyncRegistry),
    options: params.options,
    forceClone: entity.forceClone,
    castShadow: rawModel3d.castShadow,
    receiveShadow: rawModel3d.receiveShadow,
    position: rawModel3d.position,
    rotation: rawModel3d.rotation,
    scale: rawModel3d.scale,
    ...extractSerializableRegistrableFields(entity)
  });
}

function getComplexModel3dSource(entity: TModel3d, model3dResourceAsyncRegistry: TModels3dResourceAsyncRegistry): string | undefined {
  // For cloned models we need to use the ID from the params
  const modelId: string = !entity.forceClone ? entity.getRawModel3d().uuid : (entity.getParams().model3dSource as GLTF).scene.uuid;
  return model3dResourceAsyncRegistry.findKey((val: GLTF): boolean => val.scene.uuid === modelId);
}

function getAllAnimationsSource(entity: TModel3d, animationsResourceAsyncRegistry: TAnimationsResourceAsyncRegistry): ReadonlyArray<string> | undefined {
  const allAnimations: ReadonlyArray<AnimationClip> = entity.getAnimations();

  const animationsSource: ReadonlyArray<string> = allAnimations
    .map((animation: AnimationClip): string | undefined => {
      return animationsResourceAsyncRegistry.findKey((val: TAnimations): boolean => {
        return val[0] === animation;
      });
    })
    .filter(isDefined);

  return animationsSource.length > 0 ? animationsSource : undefined;
}
