import { toBool } from '@Anarchy/Shared/Utils';
import { object, optional } from 'valibot';

export const runtimeSchema = object({
  VITE_BUILD_COMPRESSION: toBool,
  VITE_BUILD_MINIFIED: toBool,
  VITE_BUILD_SOURCEMAPS: toBool,
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_SHOW_EXIT_BTN: optional(toBool)
});

export const nodeSchema = object({
  CI: toBool
});
