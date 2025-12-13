import type { ReplaySubject } from 'rxjs';
import type { TextureLoader } from 'three';

export type ITextureService = {
  getLoader: () => TextureLoader;
  sendMessage: (message: string) => void;
  messages$: ReplaySubject<string>;
};
