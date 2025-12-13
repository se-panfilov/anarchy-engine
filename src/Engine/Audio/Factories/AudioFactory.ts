import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Audio/Adapters';
import type { TAudioFactory, TAudioParams, TAudioWrapper, TAudioWrapperDependencies } from '@/Engine/Audio/Models';
import { isAudio3dParams } from '@/Engine/Audio/Utils';
import { Audio3dWrapper } from '@/Engine/Audio/Wrappers';
import type { TSpaceLoops } from '@/Engine/Space';

function create(params: TAudioParams, loops: Pick<TSpaceLoops, 'audioLoop'>): TAudioWrapper | never {
  if (isAudio3dParams(params)) return Audio3dWrapper(params, loops);
  // TODO 11.0.0: add possibility to create music, sfx and other types of non-spatial audio
  throw new Error('Audio factory: unknown params type');
}

const factory: TReactiveFactoryWithDependencies<TAudioWrapper, TAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>> = ReactiveFactoryWithDependencies(FactoryType.Audio, create);
export const AudioFactory = (): TAudioFactory => ({ ...factory, configToParams });
