import type { TAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { TVector3Wrapper } from '@/Engine/Vector';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsParams = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    camera: ICameraWrapper;
    canvas: TAppCanvas;
    target?: TVector3Wrapper;
    cursor?: TVector3Wrapper;
  }> &
  IWithReadonlyTags;
