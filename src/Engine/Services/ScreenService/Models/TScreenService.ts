import type { TAppCanvas } from '@/Engine/App';
import type { TNoSpread } from '@/Engine/Mixins';

export type TScreenService = Readonly<{
  setCanvas: (canvas: TAppCanvas) => void;
  getCanvas: () => TAppCanvas | undefined;
  goFullScreen: () => Promise<void>;
  exitFullScreen: () => Promise<void>;
  toggleFullScreen: () => Promise<void>;
  isFullScreen: () => boolean;
}> &
  TNoSpread;
