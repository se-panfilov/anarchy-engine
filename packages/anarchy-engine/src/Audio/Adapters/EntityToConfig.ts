import type { TAbstractAudioWrapper, TAnyAudio, TAnyAudioConfig, TAudio3dConfig, TAudioConfigToParamsDependencies } from '@Anarchy/Engine/Audio/Models';
import { isAudio3dWrapper } from '@Anarchy/Engine/Audio/Utils';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import { filterOutEmptyFields, isNotDefined, omitInObjectWithoutMutation } from '@Shared/Utils';

export function audioToConfig<T extends TAnyAudio>(entity: TAbstractAudioWrapper<T>, { audioResourceAsyncRegistry, audioListenersRegistry }: TAudioConfigToParamsDependencies): TAnyAudioConfig {
  const { volume$, loop$, speed$, pause$, seek$ } = entity;

  const audio3dConfig: TAudio3dConfig = isAudio3dWrapper(entity)
    ? {
        refDistance: entity.entity.getRefDistance(),
        rolloffFactor: entity.entity.getRolloffFactor(),
        maxDistance: entity.entity.getMaxDistance(),
        directionalCone: entity.directionalCone$.value,
        distanceModel: entity.entity.getDistanceModel(),
        performance: entity.getPerformance(),
        listener: audioListenersRegistry.findKeyByValue(entity.entity.listener),
        ...omitInObjectWithoutMutation(entity.drive.serialize(), ['rotation', 'scale'])
      }
    : ({} as any);

  if (isNotDefined(entity.entity.buffer)) throw new Error(`[Serialization] Audio: Cannot serialize Audio without audio buffer: "${entity.name}" (id: "${entity.id}")`);
  const audioSource: string = audioResourceAsyncRegistry.getKeyByValue(entity.entity.buffer);

  return filterOutEmptyFields({
    ...audio3dConfig,
    ...extractSerializableRegistrableFields(entity),
    volume: volume$.value,
    loop: loop$.value,
    speed: speed$.value,
    pause: pause$.value,
    seek: seek$.value,
    audioSource
  });
}
