import type { TEulerWrapper } from '@/Engine/Euler';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TObject3DProps } from './TObject3DProps';

export type TObject3DParams = Omit<TObject3DProps, 'position' | 'rotation' | 'scale'> &
  Readonly<{
    position?: TVector3Wrapper;
    rotation?: TEulerWrapper;
    scale?: TVector3Wrapper;
  }>;
