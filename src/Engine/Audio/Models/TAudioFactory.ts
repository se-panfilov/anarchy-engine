import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TAnyAudioWrapper } from './TAnyAudioWrapper';
import type { TAudioConfig } from './TAudioConfig';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioParams } from './TAudioParams';
import type { TAudioWrapperDependencies } from './TAudioWrapperDependencies';

export type TAudioFactory = TReactiveFactoryWithDependencies<TAnyAudioWrapper, TAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>> &
  TParamsFromConfigWithDependencies<TAudioConfig, TAudioParams, TAudioConfigToParamsDependencies>;
