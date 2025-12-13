import type { TAnyCameraWrapper } from '@/Engine/Camera';

import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';

export type TIntersectionsCameraWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    findCamera: () => TAnyCameraWrapper | undefined;
    getCamera: () => TAnyCameraWrapper | never;
    setCamera: (cam: TAnyCameraWrapper) => void;
  }>;
