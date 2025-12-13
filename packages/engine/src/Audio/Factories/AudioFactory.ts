import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Audio/Adapters';
import type { TAnyAudioParams, TAnyAudioWrapper, TAudioFactory, TAudioServiceDependencies, TAudioWrapperDependencies } from '@/Audio/Models';
import { isAudio3dParams } from '@/Audio/Utils';
import { Audio3dWrapper, AudioWrapper } from '@/Audio/Wrappers';
import type { TSpaceLoops } from '@/Space';

function create(params: TAnyAudioParams, loops: Pick<TSpaceLoops, 'audioLoop'> & TAudioServiceDependencies): TAnyAudioWrapper {
  if (isAudio3dParams(params)) return Audio3dWrapper(params, loops);
  else return AudioWrapper(params);
}

export function AudioFactory(): TAudioFactory {
  const factory: TReactiveFactory<TAnyAudioWrapper, TAnyAudioParams, TAudioWrapperDependencies> = ReactiveFactory(FactoryType.Audio, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
