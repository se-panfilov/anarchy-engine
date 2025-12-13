import type { TMaterialConfig, TMaterialWrapper } from '@/Engine/Material/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';

export function materialToConfig(entity: TMaterialWrapper): TMaterialConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return {
    ...extractRegistrableFields(entity)
  } as any;
}
