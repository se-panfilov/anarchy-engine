import * as dotenv from 'dotenv';
import { parse } from 'valibot';

import { nodeSchema } from './env-schema';

dotenv.config({ path: ['.env', '.env.ci'], override: false, quiet: true });

export const nodeEnv = parse(nodeSchema, process.env);
