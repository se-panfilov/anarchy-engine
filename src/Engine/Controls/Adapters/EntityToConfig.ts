import type { TControlsConfig, TControlsWrapper } from '@/Engine/Controls/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';

export function controlsToConfig(entity: TControlsWrapper): TControlsConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);
  // TODO 15-0-0: implement adapters for FpsControls, OrbitControls

  return {
    // TODO 15-0-0: fix any
    ...extractRegistrableFields(entity)
  } as any;
}
