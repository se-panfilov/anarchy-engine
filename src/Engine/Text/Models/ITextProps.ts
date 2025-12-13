import type { IWithName } from '@/Engine/Mixins';
import type { TextType } from '@/Engine/Text/Constants';
import type { TVector2Wrapper } from '@/Engine/Vector';

import type { ITextCssProps } from './ITextCssProps';

export type ITextProps = Readonly<{
  text: string;
  type: TextType;
  cssProps?: ITextCssProps;
  center?: TVector2Wrapper;
  elementType?: string;
}> &
  IWithName;
