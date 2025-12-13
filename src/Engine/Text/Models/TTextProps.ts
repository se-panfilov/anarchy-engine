import type { TWithName } from '@/Engine/Mixins';
import type { TextType } from '@/Engine/Text/Constants';
import type { TVector2Wrapper } from '@/Engine/Vector';

import type { TTextCssProps } from './TTextCssProps';

export type TTextProps = Readonly<{
  text: string;
  type: TextType;
  cssProps?: TTextCssProps;
  center?: TVector2Wrapper;
  elementType?: string;
}> &
  TWithName;
