import { parse } from 'valibot';

import { runtimeSchema } from './env-schema';

export const runtimeEnv = parse(runtimeSchema, import.meta.env);
