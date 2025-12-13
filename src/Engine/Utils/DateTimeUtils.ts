import { format, parseISO } from 'date-fns';
import type { Locale } from 'date-fns/locale/types';

export function getDuration(minutes: number, locale: string, unit: 'long' | 'short' | 'narrow' = 'long'): string {
  const formatterHours = timeUnitFormatter(locale, 'hour', unit);
  const formatterMinutes = timeUnitFormatter(locale, 'minute', unit);
  const formatterList = new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' });

  const [hours, mins]: [number, number] = [Math.floor(minutes / 60), minutes % 60];

  if (hours === 0 && mins === 0) return formatterMinutes(mins);

  return formatterList.format([hours ? formatterHours(hours) : (null as any), mins ? formatterMinutes(mins) : null].filter((v: unknown): boolean => v !== null));
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function timeUnitFormatter(locale: string, unit: 'hour' | 'minute', unitDisplay: 'long' | 'short' | 'narrow') {
  return Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay }).format;
}

export const toDate = (date: string, locale: Locale): string => format(parseISO(date), 'd MMMM yyyy', { locale });

export const toTime = (date: string, locale: Locale): string => format(parseISO(date), 'HH:mm', { locale });

export const toDateAndTime = (date: string, locale: Locale): { date: string; time: string } => ({ date: toDate(date, locale), time: toTime(date, locale) });
