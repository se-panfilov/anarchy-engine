import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsParams = IOrbitControlsProps &
  Readonly<{
    camera: ICameraWrapper;
    canvas: IAppCanvas;
  }> &
  IWithReadonlyTags<ControlsTag>;
