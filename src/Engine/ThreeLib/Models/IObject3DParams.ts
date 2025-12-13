import type { TEulerWrapper } from '@/Engine/Euler';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { IObject3DProps } from './IObject3DProps';

export type IObject3DParams = Omit<IObject3DProps, 'position' | 'rotation' | 'scale'> &
  Readonly<{
    position?: TVector3Wrapper;
    rotation?: TEulerWrapper;
    scale?: TVector3Wrapper;
  }>;
