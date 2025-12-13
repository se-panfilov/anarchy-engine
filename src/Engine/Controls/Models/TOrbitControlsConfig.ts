import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TWithCoordsXYZ, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TOrbitControlsProps } from './TOrbitControlsProps';

export type TOrbitControlsConfig = Omit<TOrbitControlsProps, 'target' | 'cursor'> &
  Readonly<{
    type: ControlsType;
    cameraName: string;
    target?: TWithCoordsXYZ;
    cursor?: TWithCoordsXYZ;
  }> &
  TWithReadonlyTags;
