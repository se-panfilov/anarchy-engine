import { toBool } from '@Shared/Utils';
import { object } from 'valibot';

export const runtimeSchema = object({
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_APP_SHOW_DEV_NAV: toBool,
  VITE_SHOW_EXIT_GAME_MENU_BTN: toBool
  // TODO DESKTOP: shall we fully remove VITE_APP_DRACO_DECODER_PATH?
  // VITE_APP_DRACO_DECODER_PATH: optional(string())
});

// export const nodeSchema = object({
//   CI: toBool,
//   PORT: toInt
// });
