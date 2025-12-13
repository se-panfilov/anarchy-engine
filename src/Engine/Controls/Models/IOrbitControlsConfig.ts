import type { ControlsTag, ControlsType } from '@/Engine/Controls/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsConfig = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    cameraTag: string;
    target?: { x: number; y: number; z: number };
    cursor?: { x: number; y: number; z: number };
  }> &
  IWithReadonlyTags<ControlsTag>;
