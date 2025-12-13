import type { ILevel } from '@/Engine';

export type IShowcase = Readonly<{
  start: () => void | Promise<void>;
  level: ILevel;
}>;
