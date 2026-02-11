import type { TParamsFromConfig } from '@Anarchy/Engine/Abstract';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorParams } from './TActorParams';

export type TParamsFromConfigActor = Omit<TParamsFromConfig<TActorConfig, TActorParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TActorConfig, dependencies: TActorConfigToParamsDependencies) => TActorParams;
  }>;
