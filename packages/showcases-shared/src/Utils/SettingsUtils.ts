import { isAllNotDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { TShowcaseGameSettings } from '@Showcases/Shared/Models';

export function isSettings(settings: TShowcaseGameSettings | unknown): settings is TShowcaseGameSettings {
  if (isNotDefined(settings)) return false;
  if (typeof settings !== 'object') return false;
  const { graphics, localization, debug, internal, audio } = settings as TShowcaseGameSettings;
  if (isAllNotDefined([graphics, audio, localization, debug, internal])) return false;

  return true;
}
