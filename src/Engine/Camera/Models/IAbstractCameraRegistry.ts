import type { IAbstractRegistry } from '@/Engine/Abstract';

import type { ICameraWrapper } from './ICameraWrapper';

export type IAbstractCameraRegistry = IAbstractRegistry<ICameraWrapper> & {
  getActiveCamera: () => ICameraWrapper | undefined;
};
