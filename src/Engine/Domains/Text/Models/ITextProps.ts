import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text';
import type { IVector2Wrapper } from '@/Engine/Wrappers';

export type ITextProps = Readonly<{
  text: string;
  backgroundColor?: string;
  className?: string;
  fontSize: string;
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
  center?: IVector2Wrapper;
  elementType?: string;
}>;
