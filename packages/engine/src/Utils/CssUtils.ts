import { CssUnits } from '@/Global';
import { isNotDefined } from '@/Utils/CheckUtils';

export function getBaseTextSize(): number {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function toPx(value: string | number | undefined): string {
  const defaultBaseTextSize: number = 16;
  const baseTextSize: number = getBaseTextSize() || defaultBaseTextSize;
  if (isNotDefined(value)) return `${baseTextSize}px`;
  if (typeof value === 'number') return `${value}px`;
  return getSizeInPx(value);
}

export function toRem(value: string | number | undefined): string {
  const defaultBaseTextSize: number = 16;
  const baseTextSize: number = getBaseTextSize() || defaultBaseTextSize;
  if (isNotDefined(value)) return `${baseTextSize / 16}rem`;
  if (typeof value === 'number') return `${value / baseTextSize}rem`;
  return getSizeInRem(value);
}

// eslint-disable-next-line functional/prefer-tacit
export const stripUnits = (value: string): number => parseFloat(value);

function getSizeInPx(size: string): string {
  const units: string = getUnitsFromCssValue(size);
  const value: number = stripUnits(size);
  switch (units) {
    case CssUnits.Px:
      return `${value}px`;
    case CssUnits.Em:
      return `${value * getBaseTextSize()}px`;
    case CssUnits.Rem:
      return `${value * getBaseTextSize()}px`;
    case CssUnits.Percent:
      return `${(value * getBaseTextSize()) / 100}px`;
    case CssUnits.Pt:
      return `${(value * 4) / 3}px`; // 1pt = 1.3333px
    default:
      return size;
  }
}

function getSizeInRem(size: string): string {
  const units: string = getUnitsFromCssValue(size);
  const value: number = stripUnits(size);
  switch (units) {
    case CssUnits.Px:
      return `${value / getBaseTextSize()}rem`;
    case CssUnits.Em:
      return `${value}rem`; // Em is relative to the font size of the element, so it remains the same
    case CssUnits.Rem:
      return `${value}rem`;
    case CssUnits.Percent:
      return `${(value / 100) * (getBaseTextSize() / 16)}rem`;
    case CssUnits.Pt:
      return `${(value * 4) / (3 * getBaseTextSize())}rem`; // 1pt = 1.3333px
    default:
      return size;
  }
}

export function getUnitsFromCssValue(value: string): string {
  const match = value.match(/([a-zA-Z%]+)$/);
  return match ? match[1] : '';
}
