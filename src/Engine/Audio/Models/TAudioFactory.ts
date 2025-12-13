import type { Howl } from 'howler';

import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TAudioConfig } from './TAudioConfig';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioParams } from './TAudioParams';
import type { TAudioServiceDependencies } from './TAudioServiceDependencies';

export type TAudioFactory = TReactiveFactoryWithDependencies<Howl, TAudioParams, Pick<TAudioServiceDependencies, 'AudioRawToAudioConnectionRegistry'>> &
  TParamsFromConfigWithDependencies<TAudioConfig, TAudioParams, TAudioConfigToParamsDependencies>;
