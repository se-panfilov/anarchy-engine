import type { IWithConfigId, IWithReadonlyTags } from '@/Engine/Mixins';
import type { TextTag } from '@/Engine/Text/Constants';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ITextProps } from './ITextProps';

export type ITextConfig = Omit<ITextProps, 'center'> &
  Readonly<{
    center?: { x: number; y: number };
  }> &
  IWithConfigId &
  IObject3DPropConfig &
  IWithReadonlyTags<TextTag>;
