import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TRendererConfig, TRendererWrapper } from '@/Engine/Renderer/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function rendererToConfig(entity: TRendererWrapper): TRendererConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
