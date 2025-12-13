import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Audio/Adapters';
import type { TAnyAudioParams, TAnyAudioWrapper, TAudioFactory, TAudioServiceDependencies, TAudioWrapperDependencies } from '@Anarchy/Engine/Audio/Models';
import { isAudio3dParams } from '@Anarchy/Engine/Audio/Utils';
import { Audio3dWrapper, AudioWrapper } from '@Anarchy/Engine/Audio/Wrappers';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';

function create(params: TAnyAudioParams, loops: Pick<TSpaceLoops, 'audioLoop'> & TAudioServiceDependencies): TAnyAudioWrapper {
  if (isAudio3dParams(params)) return Audio3dWrapper(params, loops);
  else return AudioWrapper(params);
}

export function AudioFactory(): TAudioFactory {
  const factory: TReactiveFactory<TAnyAudioWrapper, TAnyAudioParams, TAudioWrapperDependencies> = ReactiveFactory(FactoryType.Audio, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
