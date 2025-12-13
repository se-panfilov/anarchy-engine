import type { IHtmlElementStyleDeclaration } from '@/Engine/Abstract';
import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Text/Constants';

type IKeysOfCssProps = keyof Omit<IHtmlElementStyleDeclaration, 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty' | 'parentRule'>;
type ICssProps = Readonly<{ [key in IKeysOfCssProps]?: string }>;

export type ITextCssProps = Omit<ICssProps, 'textAlign' | 'direction' | 'overflowWrap' | 'whiteSpace' | 'fontStyle' | 'fontWeight'> &
  Readonly<{
    textAlign?: TextAlign;
    direction?: TextDirection;
    overflowWrap?: TextOverflowWrap;
    whiteSpace?: TextWhiteSpace;
    fontStyle?: TextFontStyle;
    fontWeight?: TextFontWeight;
  }>;
