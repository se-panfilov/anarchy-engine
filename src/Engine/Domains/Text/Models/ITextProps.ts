import type { TextType } from '@/Engine/Domains/Text/Constants';
import type { IVector2Wrapper } from '@/Engine/Domains/Vector';

import type { ITextCssProps } from './ITextCssProps';

export type ITextProps = Readonly<{
  text: string;
  type: TextType;
  cssProps?: ITextCssProps;
  center?: IVector2Wrapper;
  elementType?: string;
}>;
