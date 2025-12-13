import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TAudioConfig } from './TAudioConfig';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioParams } from './TAudioParams';
import type { TAudioServiceDependencies } from './TAudioServiceDependencies';
import type { TAudioWrapper } from './TAudioWrapper';

export type TAudioFactory = TReactiveFactoryWithDependencies<TAudioWrapper, TAudioParams, Pick<TAudioServiceDependencies, 'AudioRawToAudioConnectionRegistry'>> &
  TParamsFromConfigWithDependencies<TAudioConfig, TAudioParams, TAudioConfigToParamsDependencies>;
