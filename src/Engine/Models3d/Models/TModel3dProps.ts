import type { TEulerWrapper } from '@/Engine/Euler';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dProps = Readonly<{
  url: string;
  castShadow?: boolean;
  options: TModel3dLoadOptions;
}> &
  Readonly<{
    position?: TVector3Wrapper;
    rotation?: TEulerWrapper;
    scale?: TVector3Wrapper;
  }>;
