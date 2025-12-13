import type { ICameraAccessors } from '@Engine/Wrappers';
import type { IWrapper } from '@Engine/Models';
import type { PerspectiveCamera } from 'three';

export type ICameraWrapper = IWrapper<PerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tag: string | undefined;
  }>;
