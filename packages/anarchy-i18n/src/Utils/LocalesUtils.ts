import type { TLocaleId } from '@Anarchy/i18n/Models';
import { isDefined, removeDuplicatesStr } from '@Anarchy/Shared/Utils';

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
