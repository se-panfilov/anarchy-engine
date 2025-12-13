import type { TEntity } from '@/Engine/Abstract';
import type { TPhysicsBody } from '@/Engine/Physics';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorEntities } from './TActorEntities';
import type { TActorModel3dSettings } from './TActorModel3dSettings';

export type TActor = Omit<TEntity<TActorEntities>, 'serialize'> &
  Readonly<{
    getModel3dSettings: () => TActorModel3dSettings | undefined;
    getPhysicsBody: () => TPhysicsBody | undefined;
    serialize: (dependencies: TActorConfigToParamsDependencies) => TActorConfig;
  }>;
