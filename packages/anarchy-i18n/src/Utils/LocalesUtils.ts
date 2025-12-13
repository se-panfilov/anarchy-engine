import type { TLocale, TLocaleId } from '@Anarchy/i18n/Models';
import { isDefined, isNotDefined, removeDuplicatesStr } from '@Anarchy/Shared/Utils';

export const getLangFromLocaleId = (localeId: TLocaleId): string => localeId.split('-')[0].toLowerCase();

export function getPreferLocaleId(preferredLocaleIds: ReadonlyArray<TLocaleId>, availableLocaleIds: ReadonlyArray<TLocaleId>, fallBackLocaleId: TLocaleId): TLocaleId {
  const exactMatch: TLocaleId | undefined = preferredLocaleIds.find((locale: TLocaleId) => availableLocaleIds.includes(locale));
  if (exactMatch) return exactMatch;

  // Try to find match by language only (e.g. "en" from "en-US")
  const preferredLangs: ReadonlyArray<string> = removeDuplicatesStr(preferredLocaleIds.map(getLangFromLocaleId));
  const langMatch: TLocaleId | undefined = availableLocaleIds.find((id: TLocaleId): boolean => preferredLangs.includes(getLangFromLocaleId(id)));

  if (isDefined(langMatch)) return langMatch;

  return fallBackLocaleId;
}

export function getLocaleByLocaleId(localeId: TLocaleId, availableLocales: ReadonlyArray<TLocale>): TLocale | never {
  const result: TLocale | undefined = availableLocales.find((locale: TLocale): boolean => locale.id === localeId);
  if (isNotDefined(result)) throw new Error(`[LOCALE] Cannot find locale. Locale id is not defined`);
  return result;
}

export function stringToLocaleId(str: string | TLocaleId): TLocaleId {
  if (isNotDefined(str)) throw new Error(`[LOCALE] Cannot convert string "${str}" to LocaleId: not defined`);
  const clean = String(str).trim().replace(/_/g, '-');
  const [canon] = Intl.getCanonicalLocales(clean);
  return canon as TLocaleId;
}
