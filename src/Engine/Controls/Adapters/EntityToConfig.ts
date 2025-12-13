import type { TControlsConfig, TControlsWrapper } from '@/Engine/Controls/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function controlsToConfig(entity: TControlsWrapper): TControlsConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);
  // TODO 15-0-0: implement adapters for FpsControls, OrbitControls

  return filterOutEmptyFields({
    // TODO 15-0-0: fix any
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
