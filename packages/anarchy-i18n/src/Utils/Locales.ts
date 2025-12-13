import type { TLocaleId } from '@Anarchy/i18n/Models';
import { isDefined } from '@Anarchy/Shared/Utils';

export const getLangFromLocaleId = (localeId: TLocaleId): string => localeId.split('-')[0].toLowerCase();

export function getPreferLocaleId(preferredLocaleIds: ReadonlyArray<TLocaleId>, availableLocaleIds: ReadonlyArray<TLocaleId>, fallBackLocaleId: TLocaleId): TLocaleId {
  const exactMatch: TLocaleId | undefined = availableLocaleIds.find((locale: TLocaleId) => preferredLocaleIds.includes(locale));
  if (exactMatch) return exactMatch;

  // TODO DESKTOP: Get rid of duplications
  // Try to find match by language only (e.g. "en" from "en-US")
  const preferredLangs: ReadonlyArray<string> = preferredLocaleIds.map(getLangFromLocaleId);
  const langMatch: TLocaleId | undefined = availableLocaleIds.find((id: TLocaleId): boolean => getLangFromLocaleId(id) in preferredLangs);

  if (isDefined(langMatch)) return langMatch;

  return fallBackLocaleId;
}
