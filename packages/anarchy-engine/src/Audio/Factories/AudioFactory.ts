import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { audioConfigToParams } from '@hellpig/anarchy-engine/Audio/Adapters';
import type { TAnyAudioParams, TAnyAudioWrapper, TAudioFactory, TAudioServiceDependencies, TAudioWrapperDependencies } from '@hellpig/anarchy-engine/Audio/Models';
import { isAudio3dParams } from '@hellpig/anarchy-engine/Audio/Utils';
import { Audio3dWrapper, AudioWrapper } from '@hellpig/anarchy-engine/Audio/Wrappers';
import type { TSpaceLoops } from '@hellpig/anarchy-engine/Space';

function create(params: TAnyAudioParams, loops: Pick<TSpaceLoops, 'audioLoop'> & TAudioServiceDependencies): TAnyAudioWrapper {
  if (isAudio3dParams(params)) return Audio3dWrapper(params, loops);
  else return AudioWrapper(params);
}

export function AudioFactory(): TAudioFactory {
  const factory: TReactiveFactory<TAnyAudioWrapper, TAnyAudioParams, TAudioWrapperDependencies> = ReactiveFactory(FactoryType.Audio, create);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: audioConfigToParams });
}
