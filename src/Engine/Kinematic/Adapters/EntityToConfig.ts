import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import type { TRegistrable } from '@/Engine/Mixins';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function kinematicToConfig<T extends Readonly<{ kinematic?: TOptional<TKinematicParams> } & TRegistrable>>(entity: T): TKinematicConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
