import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import type { TOptional } from '@/Engine/Utils';

export function kinematicToConfig<T extends Readonly<{ kinematic?: TOptional<TKinematicParams> }>>(entity: T): TKinematicConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return {} as any;
}
