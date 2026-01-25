import { isAllNotDefined, isDefined, isNotDefined, isObject, isString } from '@Anarchy/Shared/Utils';
import { ShowcasesLocales } from '@Showcases/i18n/Constants';
import type { TLegalDoc, TLoadDocPayload, TShowcasesGameSettings } from '@Showcases/Shared/Models';

export function isSettings(settings: TShowcasesGameSettings | unknown): settings is TShowcasesGameSettings {
  if (isNotDefined(settings)) return false;
  if (typeof settings !== 'object') return false;
  const { graphics, localization, debug, internal, audio } = settings as TShowcasesGameSettings;
  if (isAllNotDefined([graphics, audio, localization, debug, internal])) return false;

  return true;
}

export function hasJsonStructure(str: string | Record<string, any> | Array<any> | unknown): boolean {
  const val = isObject(str) || Array.isArray(str) ? JSON.stringify(str) : str;
  if (typeof val !== 'string') return false;

  try {
    const result = JSON.parse(val);
    const type: string = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]';
  } catch {
    return false;
  }
}

export function isPartialSettings(settings: TShowcasesGameSettings | unknown): settings is Partial<TShowcasesGameSettings> {
  if (isNotDefined(settings)) return false;
  if (typeof settings !== 'object') return false;
  if (isSettings(settings)) return true;
  const { graphics, localization, debug, internal, audio } = settings as Partial<TShowcasesGameSettings>;
  if (isDefined(graphics) || isDefined(audio) || isDefined(localization) || isDefined(debug) || isDefined(internal)) return true;

  return false;
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

export function isLoadDoc(doc: TLegalDoc | unknown): doc is TLegalDoc {
  if (isNotDefined(doc)) return false;
  if (typeof doc !== 'object') return false;
  const { name, content } = doc as TLegalDoc;
  if (isAllNotDefined([name])) return false;
  if (!isString(name)) return false;
  if (!isString(content)) return false;

  return true;
}
