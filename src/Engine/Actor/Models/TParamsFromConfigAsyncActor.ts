import type { TParamsFromConfigAsync } from '@/Engine/Abstract';

import type { TActorConfig } from './TActorConfig';
import type { TActorConfigToParamsDependencies } from './TActorConfigToParamsDependencies';
import type { TActorParams } from './TActorParams';

export type TParamsFromConfigAsyncActor = Omit<TParamsFromConfigAsync<TActorConfig, TActorParams>, 'configToParamsAsync'> &
  Readonly<{
    configToParamsAsync: (config: TActorConfig, dependencies: TActorConfigToParamsDependencies) => Promise<TActorParams>;
  }>;
