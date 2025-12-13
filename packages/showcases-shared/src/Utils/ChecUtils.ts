import { isAllNotDefined, isDefined, isNotDefined, isString } from '@Anarchy/Shared/Utils';
import { ShowcasesLocales } from '@Showcases/Shared/Constants';
import type { TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared/Models';

export function isSettings(settings: TShowcaseGameSettings | unknown): settings is TShowcaseGameSettings {
  if (isNotDefined(settings)) return false;
  if (typeof settings !== 'object') return false;
  const { graphics, localization, debug, internal, audio } = settings as TShowcaseGameSettings;
  if (isAllNotDefined([graphics, audio, localization, debug, internal])) return false;

  return true;
}
export function isLoadDocPayload(payload: TLoadDocPayload | unknown): payload is TLoadDocPayload {
  if (isNotDefined(payload)) return false;
  if (typeof payload !== 'object') return false;
  const { name, locale } = payload as TLoadDocPayload;
  if (isAllNotDefined([name])) return false;
  if (!isString(name)) return false;
  if (isDefined(locale) && isNotDefined(ShowcasesLocales[locale])) return false;

  return true;
}
