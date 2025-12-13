import type { IWrapper } from '@Engine/Domains/Abstract';

import type { CommonTag } from '@/Engine/Domains/Abstract';
import type { CameraTag } from '@/Engine/Domains/Camera/Constants';

import type { ICameraAccessors } from './ICameraAccessors';
import type { IPerspectiveCamera } from './IPerspectiveCamera';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tags: ReadonlyArray<CameraTag | CommonTag | string>;
  }>;
