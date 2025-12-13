import type { TEntity } from '@/Engine/Abstract';
import type { TPhysicsBodyParams } from '@/Engine/Physics';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorEntities } from './TActorEntities';
import type { TActorModel3dSettings } from './TActorModel3dSettings';

export type TActor = Omit<TEntity<TActorEntities>, 'serialize'> &
  // TODO 15-0-0: extract all .serialize() with dependencies
  Readonly<{
    serialize: (dependencies: TActorConfigToParamsDependencies) => TActorConfig;
    getModel3dSettings: () => TActorModel3dSettings | undefined;
    getPhysicsSettings: () => TPhysicsBodyParams | undefined;
  }>;
