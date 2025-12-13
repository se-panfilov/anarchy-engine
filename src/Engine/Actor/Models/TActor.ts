import type { TEntity } from '@/Engine/Abstract';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorEntities } from './TActorEntities';
import type { TActorModel3dSettingsConfig } from './TActorModel3dSettingsConfig';

export type TActor = Omit<TEntity<TActorEntities>, 'serialize'> &
  // TODO 15-0-0: extract all .serialize() with dependencies
  Readonly<{
    serialize: (dependencies: TActorConfigToParamsDependencies) => TActorConfig;
    getModel3dSettings: () => TActorModel3dSettingsConfig | undefined;
  }>;
