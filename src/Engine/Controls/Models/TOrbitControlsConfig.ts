import type { Vector3 } from 'three';

import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsConfig = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    cameraName: string;
    target?: Vector3;
    cursor?: Vector3;
  }> &
  TWithReadonlyTags;
