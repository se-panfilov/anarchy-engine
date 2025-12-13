import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TSpace, TSpaceConfig } from '@/Engine/Space/Models';

export function spaceToConfig(entity: TSpace): TSpaceConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return {
    ...extractRegistrableFields(entity)
  } as any;
}
