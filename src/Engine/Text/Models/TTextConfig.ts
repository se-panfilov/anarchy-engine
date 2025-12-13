import type { Vector2 } from 'three';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TTextProps } from './TTextProps';

export type TTextConfig = Omit<TTextProps, 'center'> &
  Readonly<{
    center?: Vector2;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
