import type { IAppCanvas } from '@/Engine/App';

export type IScreenService = Readonly<{
  setCanvas: (canvas: IAppCanvas) => void;
  getCanvas: () => IAppCanvas | undefined;
  goFullScreen: () => Promise<void>;
  exitFullScreen: () => Promise<void>;
  toggleFullScreen: () => Promise<void>;
  isFullScreen: () => boolean;
}>;
