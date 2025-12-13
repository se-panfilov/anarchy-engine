import type { IWithName } from '@/Engine/Mixins';
import type { TextType } from '@/Engine/Text/Constants';
import type { IVector2Wrapper } from '@/Engine/Vector';

import type { ITextCssProps } from './ITextCssProps';

export type ITextProps = Readonly<{
  text: string;
  type: TextType;
  cssProps?: ITextCssProps;
  center?: IVector2Wrapper;
  elementType?: string;
}> &
  IWithName;
