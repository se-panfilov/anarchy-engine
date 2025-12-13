import type { ILevel } from '@/Engine';

export type IShowcase = Readonly<{
  start: () => void;
  level: ILevel;
}>;
