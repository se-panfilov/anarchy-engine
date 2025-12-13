import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IVector3Wrapper } from '@/Engine/Domains/Vector';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsParams = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    camera: ICameraWrapper;
    canvas: IAppCanvas;
    target?: IVector3Wrapper;
    cursor?: IVector3Wrapper;
  }> &
  IWithReadonlyTags<ControlsTag>;
