import type { IAppCanvas } from '@/Engine/Domains/App';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IControlsProps } from './IControlsProps';

export type IControlsParams = IControlsProps &
  Readonly<{
    camera: ICameraWrapper;
    canvas: IAppCanvas;
  }> &
  IWithReadonlyTags<ControlsTag>;
