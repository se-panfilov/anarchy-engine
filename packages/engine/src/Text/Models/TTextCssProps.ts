import type { THtmlElementStyleDeclaration } from '@/Abstract';
import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Text/Constants';

type TKeysOfCssProps = keyof Omit<THtmlElementStyleDeclaration, 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'parentRule'>;
type TCssProps = Readonly<{ [key in TKeysOfCssProps]?: string }>;

export type TTextCssProps = Omit<TCssProps, 'textAlign' | 'direction' | 'overflowWrap' | 'whiteSpace' | 'fontStyle' | 'fontWeight'> &
  Readonly<{
    textAlign?: TextAlign;
    direction?: TextDirection;
    overflowWrap?: TextOverflowWrap;
    whiteSpace?: TextWhiteSpace;
    fontStyle?: TextFontStyle;
    fontWeight?: TextFontWeight;
  }>;
