import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ITextProps } from './ITextProps';

export type ITextConfig = Omit<ITextProps, 'center'> &
  Readonly<{
    center?: { x: number; y: number };
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
