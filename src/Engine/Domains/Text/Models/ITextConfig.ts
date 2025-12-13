import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextProps } from './ITextProps';

export type ITextConfig = Omit<ITextProps, 'center'> &
  Readonly<{
    center?: { x: number; y: number };
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags<TextTag>;
