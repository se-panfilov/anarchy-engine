import { Howl } from 'howler';

import type { AudioType } from '@/Engine/Audio/Constants';
import type { TAudioOptions, TAudioService } from '@/Engine/Audio/Models';

// TODO 11.0.0: Fix type TAudioService
// TODO 11.0.0: How to upload a sound and reuse it?
// TODO 11.0.0: Upload async
// TODO 11.0.0: Upload from config
// TODO 11.0.0: Add effects to a sound
// TODO 11.0.0: Add Audio loop (to update 3d sounds, when position changes, but not more often than with tick$)
// TODO 11.0.0: Implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
// TODO 11.0.0: Optionally implement raycast sound (if a sound is blocked by an object)
export function AudioService(): TAudioService {
  const sounds: Map<string, Howl> = new Map();

  function loadSound(name: string, src: string, type: AudioType, options: TAudioOptions = {}): void {
    const sound = new Howl({
      src: [src],
      loop: options.loop || false,
      volume: options.volume || 1.0
    });

    sounds.set(name, sound);
  }

  const play = (name: string): void => void sounds.get(name)?.play();
  const stop = (name: string): void => void sounds.get(name)?.stop();
  const setVolume = (name: string, volume: number): void => void sounds.get(name)?.volume(volume);

  return {
    loadAsync: audioLoader.loadAsync,
    loadFromConfigAsync: audioLoader.loadFromConfigAsync,
    play,
    stop,
    setVolume
  };
}
