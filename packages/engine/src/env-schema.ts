import { toBool } from '@Shared/Utils';
import { object } from 'valibot';

export const runtimeSchema = object({
  CI: toBool,
  VITE_BUILD_COMPRESSION: toBool
});

// export const nodeSchema = object({
// CI: toBool,
// });
