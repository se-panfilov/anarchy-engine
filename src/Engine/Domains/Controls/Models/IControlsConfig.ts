import type { CameraTag } from '@/Engine/Domains/Camera';
import type { ControlsTag } from '@/Engine/Domains/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IControlsProps } from './IControlsProps';
import type { IControlsType } from './IControlsType';

export type IControlsConfig = Omit<IControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: IControlsType;
    cameraTag: CameraTag;
  }> &
  IWithReadonlyTags<ControlsTag>;
