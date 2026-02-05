import type { TParamsFromConfig } from '@hellpig/anarchy-engine/Abstract';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorParams } from './TActorParams';

export type TParamsFromConfigActor = Omit<TParamsFromConfig<TActorConfig, TActorParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TActorConfig, dependencies: TActorConfigToParamsDependencies) => TActorParams;
  }>;
