import type { TAnyCameraWrapper } from '@/Camera';

import type { TIntersectionsWatcher } from './TIntersectionsWatcher';

export type TIntersectionsCameraWatcher = TIntersectionsWatcher &
  Readonly<{
    findCamera: () => TAnyCameraWrapper | undefined;
    getCamera: () => TAnyCameraWrapper | never;
    setCamera: (cam: TAnyCameraWrapper) => void;
  }>;
