import type { TEulerWrapper } from '@/Engine/Euler';
import type { Model3dType } from '@/Engine/Models3d/Constants';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';

export type TModel3dProps = Readonly<{
  url: string | Model3dType;
  options: TModel3dLoadOptions;
}> &
  Readonly<{
    position?: TVector3Wrapper;
    rotation?: TEulerWrapper;
    scale?: TVector3Wrapper;
  }>;
