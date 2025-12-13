import type { IAppCanvas } from '@/Engine/Domains/App';

export type IScreenService = {
  setCanvas: (canvas: IAppCanvas) => void;
  getCanvas: () => IAppCanvas | undefined;
  goFullScreen: () => Promise<void>;
  exitFullScreen: () => Promise<void>;
  toggleFullScreen: () => Promise<void>;
  isFullScreen: () => boolean;
};
