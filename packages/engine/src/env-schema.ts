import { toBool } from '@Shared/Utils';
import { object } from 'valibot';

export const runtimeSchema = object({
  CI: toBool
});

// export const nodeSchema = object({
// CI: toBool,
// });
