import type { CameraTag } from '@/Engine/Camera';
import type { ControlsTag } from '@/Engine/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IControlsType } from './IControlsType';
import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsConfig = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: IControlsType;
    cameraTag: CameraTag;
    target?: { x: number; y: number; z: number };
    cursor?: { x: number; y: number; z: number };
  }> &
  IWithReadonlyTags<ControlsTag>;
