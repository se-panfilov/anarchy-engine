import { CssUnits } from '@/Engine/Global';
import { isNotDefined } from '@/Engine/Utils/CheckUtils';

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

export function stripUnits(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ''));
}

export function getUnitsFromCssValue(value: string): string {
  const match = value.match(/[a-zA-Z%]+/);
  return match ? match[0] : '';
}
