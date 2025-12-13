import type { TAnyAudioConfig, TAnyAudioWrapper, TAudio3dConfig, TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';
import { isAudio3dWrapper } from '@/Engine/Audio/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function audioToConfig(entity: TAnyAudioWrapper, audioResourceAsyncRegistry: TAudioResourceAsyncRegistry): TAnyAudioConfig {
  const { name, volume$, loop$, speed$, pause$, seek$ } = entity;
  // TODO 15-0-0: implement

  const audio3dConfig: TAudio3dConfig = isAudio3dWrapper(entity)
    ? {
        refDistance: entity.entity.getRefDistance(),
        rolloffFactor: entity.entity.getRolloffFactor(),
        maxDistance: entity.entity.getMaxDistance(),
        directionalCone: entity.directionalCone$.value,
        distanceModel: entity.entity.getDistanceModel(),
        //   performance?: TAudioPerformanceOptions;
        //   listener?: string;
        ...entity.drive.serialize()
      }
    : ({} as any);

  // TODO 15-0-0: maybe entity.entity.buffer instead? Check this in runtime.
  const audioSource: string | undefined = audioResourceAsyncRegistry.findKeyByValue(entity.entity);
  if (isNotDefined(audioSource)) throw new Error(`EntityToConfig: audioSource not found for entity with name: "${entity.name}" (id: "${entity.id}")`);

  return {
    ...audio3dConfig,
    name,
    volume: volume$.value,
    loop: loop$.value,
    speed: speed$.value,
    pause: pause$.value,
    seek: seek$.value,
    audioSource
  };
}
