import type { TFogConfig, TFogWrapper } from '@/Engine/Fog/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';

export function fogToConfig(entity: TFogWrapper): TFogConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return {
    ...extractRegistrableFields(entity)
  } as any;
}
