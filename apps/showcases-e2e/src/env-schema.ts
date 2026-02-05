import { toBool, toInt } from '@hellpig/anarchy-shared/Utils';
import { object } from 'valibot';

// export const runtimeSchema = object({
//   VITE_SHOW_DEBUG_INFO: toBool
// });

export const nodeSchema = object({
  CI: toBool,
  PORT: toInt
});
