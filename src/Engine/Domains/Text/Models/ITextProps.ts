import type { IVector2Wrapper } from '@/Engine';
import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text';

export type ITextProps = Readonly<{
  text: string;
  backgroundColor: string;
  className: string;
  fontSize?: string;
  color?: string;
  font?: string;
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
  layers?: number;
}>;
