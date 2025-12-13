import type { ICameraAccessors } from '@Engine/Wrappers';
import type { IWrapper } from '@Engine/Models';
import { IPerspectiveCamera } from '@Engine/Models';

export type ICameraWrapper = IWrapper<IPerspectiveCamera> &
  ICameraAccessors &
  Readonly<{
    tag: string | undefined;
  }>;
