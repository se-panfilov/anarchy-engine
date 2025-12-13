import * as fs from 'node:fs';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { parse } from 'valibot';

import { nodeSchema } from '../env-schema';

function loadEnvFile(file: string): void {
  const filePath: string = path.resolve(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath, override: false });
  }
}

loadEnvFile('.env'); // base
// loadEnvFile('.env.ci');

export const nodeEnv = parse(nodeSchema, process.env);
