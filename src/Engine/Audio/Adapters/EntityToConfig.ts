import type { TAnyAudioConfig, TAnyAudioWrapper, TAudio3dConfig } from '@/Engine/Audio/Models';
import { isAudio3dWrapper } from '@/Engine/Audio/Utils';

export function entityToConfig(entity: TAnyAudioWrapper): TAnyAudioConfig {
  const { name, volume$, loop$, speed$, pause$, seek$ } = entity;
  // TODO 15-0-0: implement

  const audio3dConfig: TAudio3dConfig = isAudio3dWrapper(entity) ? { ...entity.drive.serialize() } : ({} as any);
  return {
    ...audio3dConfig,
    name,
    volume: volume$.value,
    loop: loop$.value,
    speed: speed$.value,
    pause: pause$.value,
    seek: seek$.value

    //   refDistance?: number;
    //   rolloffFactor?: number;
    //   distanceModel?: 'linear' | 'inverse' | 'exponential';
    //   maxDistance?: number;
    //   directionalCone?: Vector3Like;
    //   performance?: TAudioPerformanceOptions;
    //   audioSource: string;
    //   listener?: string;

    // TODO 15-0-0: fix any
  } as any;
}
