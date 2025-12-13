import type { TKinematicConfig, TKinematicParams } from '@/Engine/Kinematic/Models';
import type { TOptional } from '@/Engine/Utils';

export function entityToConfig<T extends Readonly<{ kinematic?: TOptional<TKinematicParams> }>>(entity: T): TKinematicConfig {
  // TODO 15-0-0: implement

  return {};
}
