import { toBool } from '@Shared/Utils';
import { object, string } from 'valibot';

export const runtimeSchema = object({
  VITE_APP_SHOW_DEBUG_INFO: toBool,
  VITE_APP_DRACO_DECODER_PATH: string()
});

// export const nodeSchema = object({
//   CI: toBool,
//   PORT: toInt
// });
