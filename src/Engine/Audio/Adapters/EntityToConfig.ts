import type { TAnyAudioConfig, TAnyAudioWrapper, TAudio3dConfig } from '@/Engine/Audio/Models';
import { isAudio3dWrapper } from '@/Engine/Audio/Utils';

export function audioToConfig(entity: TAnyAudioWrapper): TAnyAudioConfig {
  const { name, volume$, loop$, speed$, pause$, seek$ } = entity;
  // TODO 15-0-0: implement

  const audio3dConfig: TAudio3dConfig = isAudio3dWrapper(entity)
    ? {
        refDistance: entity.entity.getRefDistance(),
        rolloffFactor: entity.entity.getRolloffFactor(),
        maxDistance: entity.entity.getMaxDistance(),
        directionalCone: entity.directionalCone$.value,
        distanceModel: entity.entity.getDistanceModel(),
        ...entity.drive.serialize()
      }
    : ({} as any);

  return {
    ...audio3dConfig,
    name,
    volume: volume$.value,
    loop: loop$.value,
    speed: speed$.value,
    pause: pause$.value,
    seek: seek$.value

    //   performance?: TAudioPerformanceOptions;
    //   audioSource: string;
    //   listener?: string;
  };
}
