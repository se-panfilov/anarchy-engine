import type { ControlsTag, ControlsType } from '@/Engine/Controls/Constants';
import type { IWithConfigId, IWithReadonlyTags } from '@/Engine/Mixins';

import type { IOrbitControlsProps } from './IOrbitControlsProps';

export type IOrbitControlsConfig = Omit<IOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    relatedCameraConfigId: string;
    target?: { x: number; y: number; z: number };
    cursor?: { x: number; y: number; z: number };
  }> &
  IWithConfigId &
  IWithReadonlyTags<ControlsTag>;
