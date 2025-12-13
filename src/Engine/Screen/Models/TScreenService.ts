import type { TAbstractService } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';

import type { TScreenSizeWatcherService } from './TScreenSizeWatcherService';

export type TScreenService = TAbstractService &
  Readonly<{
    watchers: TScreenSizeWatcherService;
    setCanvas: (canvas: TAppCanvas) => void;
    getCanvas: () => TAppCanvas | undefined;
    destroyCanvas: () => void;
    goFullScreen: () => Promise<void>;
    exitFullScreen: () => Promise<void>;
    toggleFullScreen: () => Promise<void>;
    isFullScreen: () => boolean;
  }>;
