import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text/Constants';
import type { IOptional } from '@/Engine/Utils';

export type ITextCssProps = Omit<IOptional<CSSStyleDeclaration>, 'textAlign' | 'direction' | 'overflowWrap' | 'whiteSpace' | 'fontStyle' | 'fontWeight'> &
  Readonly<{
    textAlign?: TextAlign;
    direction?: TextDirection;
    overflowWrap?: TextOverflowWrap;
    whiteSpace?: TextWhiteSpace;
    fontStyle?: TextFontStyle;
    fontWeight?: TextFontWeight;
  }>;
