import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TModel3d, TModel3dConfig } from '@/Engine/Models3d/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function model3dToConfig(entity: TModel3d): TModel3dConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractRegistrableFields(entity)
  }) as any;
}
