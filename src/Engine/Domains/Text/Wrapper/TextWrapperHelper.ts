import { Text2dCssClass } from '@/Engine/Domains/Text/Constants';
import type { IElement2dAccessors, ITextProps } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';

export function applyElement2dParams(
  element: IElement2dAccessors,
  { backgroundColor, className, text, fontSize, color, fontFamily, maxWidth, lineHeight, letterSpacing, textAlign, direction, overflowWrap, whiteSpace, fontStyle, fontWeight }: ITextProps
): void {
  element.setText(text);
  element.setClassName(Text2dCssClass.Text2d);

  if (isDefined(backgroundColor)) element.setBackgroundColor(backgroundColor);
  if (isDefined(className)) element.appendClassName(className);
  if (isDefined(fontSize)) element.setFontSize(fontSize);
  if (isDefined(color)) element.setColor(color);
  if (isDefined(fontFamily)) element.setFontFamily(fontFamily);
  if (isDefined(maxWidth)) element.setMaxWidth(maxWidth);
  if (isDefined(lineHeight)) element.setLineHeight(lineHeight);
  if (isDefined(letterSpacing)) element.setLetterSpacing(letterSpacing);
  if (isDefined(textAlign)) element.setTextAlign(textAlign);
  if (isDefined(direction)) element.setDirection(direction);
  if (isDefined(overflowWrap)) element.setOverflowWrap(overflowWrap);
  if (isDefined(whiteSpace)) element.setWhiteSpace(whiteSpace);
  if (isDefined(fontStyle)) element.setFontStyle(fontStyle);
  if (isDefined(fontWeight)) element.setFontWeight(fontWeight);
}
