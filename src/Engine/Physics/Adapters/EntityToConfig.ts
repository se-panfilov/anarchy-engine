import { extractRegistrableFields } from '@/Engine/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig } from '@/Engine/Physics/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function physicsToConfig(entity: TPhysicsBody): TPhysicsBodyConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);
  // TODO 15-0-0: Add adapters for Physics World, and Physics presets

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractRegistrableFields(entity)
  }) as any;
}
