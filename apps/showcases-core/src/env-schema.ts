import { toBool } from '@Anarchy/Shared/Utils';
import { nullish, object, string } from 'valibot';

export const runtimeSchema = object({
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_APP_SHOW_DEV_NAV: toBool,
  VITE_SHOW_EXIT_GAME_MENU_BTN: toBool,
  VITE_SENTRY_DSN: nullish(string()),
  VITE_RELEASE_NAME_PREFIX: string(),
  VITE_DIST_NAME: nullish(string())
  // VITE_APP_DRACO_DECODER_PATH: optional(string())
});

// export const nodeSchema = object({
//   CI: toBool,
//   PORT: toInt
// });
