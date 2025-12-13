import type { TextAlign, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text';
import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';
import type { IWriteable } from '@/Engine/Utils';

// eslint-disable-next-line functional/prefer-immutable-types
export function getElement2dAccessors(element: IWriteable<HTMLDivElement>): IElement2dAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (element.textContent = text);
  const getText = (): string | null => element.textContent;
  // eslint-disable-next-line functional/immutable-data
  const setBackgroundColor = (color: string): void => void (element.style.backgroundColor = color);
  const getBackgroundColor = (): string => element.style.backgroundColor;
  // eslint-disable-next-line functional/immutable-data
  const setClassName = (name: string): void => void (element.className = name);
  const appendClassName = (name: string): void => void element.classList.add(name);
  const getClassName = (): string => element.className;
  // eslint-disable-next-line functional/immutable-data
  const setFontSize = (fontSize: string): void => void (element.style.fontSize = fontSize);
  const getFontSize = (): string => element.style.fontSize;
  // eslint-disable-next-line functional/immutable-data
  const setColor = (color: string): void => void (element.style.color = color);
  const getColor = (): string => element.style.color;
  // eslint-disable-next-line functional/immutable-data
  const setFontFamily = (fontFamily: string): void => void (element.style.fontFamily = fontFamily);
  const getFontFamily = (): string => element.style.fontFamily;
  // eslint-disable-next-line functional/immutable-data
  const setMaxWidth = (maxWidth: string): void => void (element.style.maxWidth = maxWidth);
  const getMaxWidth = (): string => element.style.maxWidth;
  // eslint-disable-next-line functional/immutable-data
  const setLineHeight = (lineHeight: string): void => void (element.style.lineHeight = lineHeight);
  const getLineHeight = (): string => element.style.lineHeight;
  // eslint-disable-next-line functional/immutable-data
  const setLetterSpacing = (letterSpacing: string): void => void (element.style.letterSpacing = letterSpacing);
  const getLetterSpacing = (): string => element.style.letterSpacing;
  // eslint-disable-next-line functional/immutable-data
  const setTextAlign = (textAlign: TextAlign): void => void (element.style.textAlign = textAlign);
  const getTextAlign = (): TextAlign => element.style.textAlign as TextAlign;
  // eslint-disable-next-line functional/immutable-data
  const setDirection = (direction: TextDirection): void => void (element.style.direction = direction);
  const getDirection = (): TextDirection => element.style.direction as TextDirection;
  // eslint-disable-next-line functional/immutable-data
  const setOverflowWrap = (overflowWrap: TextOverflowWrap): void => void (element.style.overflowWrap = overflowWrap);
  const getOverflowWrap = (): TextOverflowWrap => element.style.overflowWrap as TextOverflowWrap;
  // eslint-disable-next-line functional/immutable-data
  const setWhiteSpace = (whiteSpace: TextWhiteSpace): void => void (element.style.whiteSpace = whiteSpace);
  const getWhiteSpace = (): TextWhiteSpace => element.style.whiteSpace as TextWhiteSpace;
  // eslint-disable-next-line functional/immutable-data
  const setFontStyle = (fontStyle: TextFontStyle): void => void (element.style.fontStyle = fontStyle);
  const getFontStyle = (): TextFontStyle => element.style.fontStyle as TextFontStyle;
  // eslint-disable-next-line functional/immutable-data
  const setFontWeight = (fontWeight: TextFontWeight): void => void (element.style.fontWeight = fontWeight);
  const getFontWeight = (): TextFontWeight => element.style.fontWeight as TextFontWeight;

  return {
    setText,
    getText,
    setBackgroundColor,
    getBackgroundColor,
    setClassName,
    appendClassName,
    getClassName,
    setFontSize,
    getFontSize,
    setColor,
    getColor,
    setFontFamily,
    getFontFamily,
    setMaxWidth,
    getMaxWidth,
    setLineHeight,
    getLineHeight,
    setLetterSpacing,
    getLetterSpacing,
    setTextAlign,
    getTextAlign,
    setDirection,
    getDirection,
    setOverflowWrap,
    getOverflowWrap,
    setWhiteSpace,
    getWhiteSpace,
    setFontStyle,
    getFontStyle,
    setFontWeight,
    getFontWeight
  };
}
