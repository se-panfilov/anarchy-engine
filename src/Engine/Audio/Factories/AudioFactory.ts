import type { Howl } from 'howler';

import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Audio/Adapters';
import { Audio } from '@/Engine/Audio/Entities';
import type { TAudioFactory, TAudioParams, TAudioServiceDependencies } from '@/Engine/Audio/Models';

const factory: TReactiveFactoryWithDependencies<Howl, TAudioParams, Pick<TAudioServiceDependencies, 'animationsService' | 'AudioRawToAudioConnectionRegistry'>> = ReactiveFactoryWithDependencies(
  FactoryType.Audio,
  Audio
);
export const AudioFactory = (): TAudioFactory => ({ ...factory, configToParams });
