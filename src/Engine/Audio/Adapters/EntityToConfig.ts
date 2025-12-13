import type { TAnyAudio, TAnyAudioConfig } from '@/Engine/Audio/Models';

export function entityToConfig(entity: TAnyAudio): TAnyAudioConfig {
  // const { drive } = entity;
  // TODO 15-0-0: implement
  // TODO 15-0-0: Check if we need different serializer for each Audio

  return {
    //Only for positional audio
    // ...drive.serialize(),
  };
}
