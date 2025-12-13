import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text/Constants';

export type ITextCssProps = Readonly<{
  backgroundColor?: string;
  className?: string;
  fontSize?: string;
  color?: string;
  fontFamily?: string;
  maxWidth?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: TextAlign;
  direction?: TextDirection;
  overflowWrap?: TextOverflowWrap;
  whiteSpace?: TextWhiteSpace;
  fontStyle?: TextFontStyle;
  fontWeight?: TextFontWeight;
}>;
