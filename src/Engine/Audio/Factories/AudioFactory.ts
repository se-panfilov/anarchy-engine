import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Audio/Adapters';
import type { TAnyAudioParams, TAnyAudioWrapper, TAudioFactory, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { isAudio3dParams } from '@/Engine/Audio/Utils';
import { Audio3dWrapper, AudioWrapper } from '@/Engine/Audio/Wrappers';
import type { TSpaceLoops } from '@/Engine/Space';

function create(params: TAnyAudioParams, loops: Pick<TSpaceLoops, 'audioLoop'>): TAnyAudioWrapper {
  if (isAudio3dParams(params)) return Audio3dWrapper(params, loops);
  else return AudioWrapper(params);
}

export function AudioFactory(): TAudioFactory {
  const factory: TReactiveFactory<TAnyAudioWrapper, TAnyAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>> = ReactiveFactory(FactoryType.Audio, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
