import { runtimeSchema } from '@hellpig/anarchy-engine/env-schema';
import { parse } from 'valibot';

export const runtimeEnv = parse(runtimeSchema, import.meta.env);
