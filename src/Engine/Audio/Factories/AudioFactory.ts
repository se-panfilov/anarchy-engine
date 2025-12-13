import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Audio/Adapters';
import type { TAudioFactory, TAudioParams, TAudioServiceDependencies, TAudioWrapper } from '@/Engine/Audio/Models';
import { Audio3dWrapper } from '@/Engine/Audio/Wrappers';

const factory: TReactiveFactoryWithDependencies<
  TAudioWrapper,
  TAudioParams,
  Pick<TAudioServiceDependencies, 'animationsService' | 'AudioRawToAudioConnectionRegistry'>
> = ReactiveFactoryWithDependencies(FactoryType.Audio, Audio3dWrapper);
export const AudioFactory = (): TAudioFactory => ({ ...factory, configToParams });
