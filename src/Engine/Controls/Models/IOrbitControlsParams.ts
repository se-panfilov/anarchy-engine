import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IVector3Wrapper } from '@/Engine/Vector';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsParams = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    camera: ICameraWrapper;
    canvas: IAppCanvas;
    target?: IVector3Wrapper;
    cursor?: IVector3Wrapper;
  }> &
  IWithReadonlyTags;
