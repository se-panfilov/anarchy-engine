import { toBool } from '@Shared/Utils';
import { object, optional, string } from 'valibot';

export const runtimeSchema = object({
  VITE_BUILD_COMPRESSION: toBool,
  PORT: optional(string()),
  VITE_BUILD_MINIFIED: toBool,
  VITE_BUILD_SOURCEMAPS: toBool,
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_SHOW_EXIT_BTN: optional(toBool)
});

export const nodeSchema = object({
  CI: toBool
});
