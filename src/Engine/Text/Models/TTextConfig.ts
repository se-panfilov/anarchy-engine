import type { TWithCoordsXY, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextProps } from './TTextProps';

export type TTextConfig = Omit<TTextProps, 'center'> &
  Readonly<{
    center?: TWithCoordsXY;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
