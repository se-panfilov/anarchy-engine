import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TAnyAudioConfig } from './TAnyAudioConfig';
import type { TAnyAudioParams } from './TAnyAudioParams';
import type { TAnyAudioWrapper } from './TAnyAudioWrapper';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioWrapperDependencies } from './TAudioWrapperDependencies';

export type TAudioFactory = TReactiveFactoryWithDependencies<TAnyAudioWrapper, TAnyAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>> &
  TParamsFromConfigWithDependencies<TAnyAudioConfig, TAnyAudioParams, TAudioConfigToParamsDependencies>;
