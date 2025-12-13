import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ITextProps } from './ITextProps';

export type ITextConfig = Omit<ITextProps, 'center'> &
  Readonly<{
    center?: { x: number; y: number };
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags;
