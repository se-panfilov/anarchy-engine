import { pipe, string, transform } from 'valibot';

export const toBool = pipe(
  string(),
  transform((v: string): boolean => v === 'true')
);

export const toInt = pipe(
  string(),
  transform((v: string): number => parseInt(v, 10))
);
