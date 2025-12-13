import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsConfig = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    cameraName: string;
    target?: { x: number; y: number; z: number };
    cursor?: { x: number; y: number; z: number };
  }> &
  TWithReadonlyTags;
