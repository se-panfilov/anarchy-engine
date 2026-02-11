import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TAnyAudioConfig } from './TAnyAudioConfig';
import type { TAnyAudioParams } from './TAnyAudioParams';
import type { TAnyAudioWrapper } from './TAnyAudioWrapper';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioWrapperDependencies } from './TAudioWrapperDependencies';

export type TAudioFactory = TReactiveFactory<TAnyAudioWrapper, TAnyAudioParams, TAudioWrapperDependencies> &
  TParamsFromConfigWithDependencies<TAnyAudioConfig, TAnyAudioParams, TAudioConfigToParamsDependencies>;
