import type { Vector3Like } from 'three/src/math/Vector3';

import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsConfig = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    cameraName: string;
    target?: Vector3Like;
    cursor?: Vector3Like;
  }> &
  TWithReadonlyTags;
