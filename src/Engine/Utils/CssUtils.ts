import { isNotDefined } from '@/Engine/Utils/CheckUtils';

export function getBaseTextSize(): number {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function toPx(value: string | number | undefined): string {
  const defaultBaseTextSize: number = 16;
  const baseTextSize: number = getBaseTextSize() || defaultBaseTextSize;
  if (isNotDefined(value)) return `${baseTextSize}px`;
  if (typeof value === 'number') return `${value}px`;
  if (/^\d+rem$/.test(value.toString())) return `${parseInt(value.toString()) * baseTextSize}px`;
  if (/^\d+em$/.test(value.toString())) return `${parseInt(value.toString()) * baseTextSize}px`;
  return `${baseTextSize}px`;
}

export function stripUnits(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ''));
}
