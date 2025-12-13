import type { TAnimationStateConfig } from '@Anarchy/Engine/Animations';
import { animationActionToConfig } from '@Anarchy/Engine/Animations/Adapters';
import type { TAnimations, TAnimationsResourceAsyncRegistry } from '@Anarchy/Engine/Animations/Models';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import type { PrimitiveModel3dType } from '@Anarchy/Engine/Models3d/Constants';
import type { TModel3d, TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams, TModels3dResourceAsyncRegistry, TRawModel3d } from '@Anarchy/Engine/Models3d/Models';
import { isPrimitiveModel3dSource } from '@Anarchy/Engine/Models3d/Utils';
import { eulerToXyz, vector3ToXyz } from '@Anarchy/Engine/Utils';
import { filterOutEmptyFields, isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { AnimationAction, AnimationClip } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function model3dToConfig(
  entity: TModel3d,
  { animationsResourceAsyncRegistry, model3dResourceAsyncRegistry }: Pick<TModel3dConfigToParamsDependencies, 'animationsResourceAsyncRegistry' | 'model3dResourceAsyncRegistry'>
): TModel3dConfig {
  const rawModel3d: TRawModel3d = entity.getRawModel3d();

  const params: TModel3dParams = entity.getParams();
  const isPrimitive: boolean = isPrimitiveModel3dSource(params.model3dSource);

  const model3dSource: string | undefined = isPrimitive ? (params.model3dSource as PrimitiveModel3dType) : getComplexModel3dSource(entity, model3dResourceAsyncRegistry);
  if (isNotDefined(model3dSource)) throw new Error(`[Serialization] Model3d: model3dSource not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const material: string | undefined = isDefined(params.material) ? params.material.name : undefined;

  return filterOutEmptyFields({
    model3dSource,
    material,
    animationsSource: getAllAnimationsSource(entity, animationsResourceAsyncRegistry),
    animationsState: serializeActiveAnimations(entity),
    options: params.options,
    forceClone: entity.forceClone,
    castShadow: rawModel3d.castShadow,
    receiveShadow: rawModel3d.receiveShadow,
    position: vector3ToXyz(rawModel3d.position),
    rotation: eulerToXyz(rawModel3d.rotation),
    scale: vector3ToXyz(rawModel3d.scale),
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

function serializeActiveAnimations(entity: TModel3d): ReadonlyArray<TAnimationStateConfig> {
  const MIN_WEIGHT = 1e-3;
  return Object.values(entity.actions)
    .filter((action: AnimationAction): boolean => {
      return action.isRunning() || (action.enabled && action.weight > MIN_WEIGHT);
    })
    .map(animationActionToConfig);
}
