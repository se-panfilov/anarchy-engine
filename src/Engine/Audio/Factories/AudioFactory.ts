import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Audio/Adapters';
import type { TAudio3dWrapper, TAudioFactory, TAudioParams, TAudioServiceDependencies } from '@/Engine/Audio/Models';
import { Audio3dWrapper } from '@/Engine/Audio/Wrappers';

const factory: TReactiveFactoryWithDependencies<
  TAudio3dWrapper,
  TAudioParams,
  Pick<TAudioServiceDependencies, 'animationsService' | 'AudioRawToAudioConnectionRegistry'>
> = ReactiveFactoryWithDependencies(FactoryType.Audio, Audio3dWrapper);
export const AudioFactory = (): TAudioFactory => ({ ...factory, configToParams });
