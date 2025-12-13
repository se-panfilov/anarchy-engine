import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TModel3d, TModel3dConfig, TModel3dConfigToParamsDependencies, TModel3dParams } from '@/Engine/Models3d/Models';
import { filterOutEmptyFields, isDefined, isNotDefined } from '@/Engine/Utils';

export function model3dToConfig(entity: TModel3d, { animationsResourceAsyncRegistry, materialRegistry, model3dResourceAsyncRegistry }: TModel3dConfigToParamsDependencies): TModel3dConfig {
  // TODO 15-0-0: implement
  // TODO 15-0-0: make sure working with Primitive models
  // TODO 15-0-0: make sure working with complex uploaded models
  // TODO 15-0-0: make sure working with animations
  // TODO 15-0-0: make sure working with materials

  // const json = entity.getRawModel3d().toJSON().object;

  // config:
  // options?: TModel3dOptions;

  const params: TModel3dParams = entity.getParams();

  const model3dSource: string | undefined = model3dResourceAsyncRegistry.findKeyByValue(entity.getRawModel3d());
  if (isNotDefined(model3dSource)) throw new Error(`[Serialization] Model3d: model3dSource not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const materialSource: string | undefined = isDefined(params.materialSource) ? materialRegistry.findKeyByValue(params.materialSource) : undefined;
  const animationsSource: ReadonlyArray<string> | undefined = isDefined(params.animationsSource) ? animationsResourceAsyncRegistry.findKeyByValue(params.animationsSource) : undefined;

  return filterOutEmptyFields({
    model3dSource,
    materialSource,
    animationsSource,
    options: params.options,
    forceClone: entity.forceClone,
    ...extractRegistrableFields(entity)
  });
}
