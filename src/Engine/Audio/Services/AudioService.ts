import { Howl } from 'howler';

import type { AudioType } from '@/Engine/Audio/Constants';
import type { TAudioOptions, TAudioService } from '@/Engine/Audio/Models';

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
    loadSound,
    play,
    stop,
    setVolume
  };
}
