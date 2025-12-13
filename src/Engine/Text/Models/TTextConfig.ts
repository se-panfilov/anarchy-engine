import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextProps } from './TTextProps';

export type TTextConfig = Omit<TTextProps, 'center'> &
  Readonly<{
    center?: { x: number; y: number };
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
