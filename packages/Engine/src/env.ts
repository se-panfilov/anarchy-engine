import { runtimeSchema } from '@shared/env-schema';
import { parse } from 'valibot';

export const runtimeEnv = parse(runtimeSchema, import.meta.env);
