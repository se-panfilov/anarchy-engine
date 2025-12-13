import type { TAppCanvas } from '@/Engine/App';

export type TScreenService = Readonly<{
  setCanvas: (canvas: TAppCanvas) => void;
  getCanvas: () => TAppCanvas | undefined;
  goFullScreen: () => Promise<void>;
  exitFullScreen: () => Promise<void>;
  toggleFullScreen: () => Promise<void>;
  isFullScreen: () => boolean;
}>;
