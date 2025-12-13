import type { AudioType } from '@/Engine/Audio/Constants';

import type { TAudioOptions } from '.';

export type TAudioService = Readonly<{
  loadSound: (name: string, src: string, type: AudioType, options?: TAudioOptions) => void;
  play: (name: string) => void;
  stop: (name: string) => void;
  setVolume: (name: string, volume: number) => void;
}>;
