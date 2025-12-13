import type { TAbstractService } from '@/Engine/Abstract';
import type { TContainerDecorator } from '@/Engine/Global';
import type { TSpaceCanvas } from '@/Engine/Space';

import type { TScreenSizeWatcherService } from './TScreenSizeWatcherService';

export type TScreenService = TAbstractService &
  Readonly<{
    watchers: TScreenSizeWatcherService;
    setCanvas: (canvas: TSpaceCanvas) => void;
    getCanvas: () => TSpaceCanvas | undefined;
    destroyCanvas: () => void;
    goFullScreen: () => Promise<void>;
    exitFullScreen: () => Promise<void>;
    toggleFullScreen: () => Promise<void>;
    isFullScreen: () => boolean;
    getContainer: () => TContainerDecorator | undefined;
  }>;
