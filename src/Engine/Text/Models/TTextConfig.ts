import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TWithCoordsXY, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextProps } from './TTextProps';

export type TTextConfig = Omit<TTextProps, 'center' | 'kinematic'> &
  Readonly<{
    center?: TWithCoordsXY;
    kinematic?: TKinematicDataConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
