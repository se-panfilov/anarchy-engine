import type { TSpace } from '@/Engine';

export type TShowcase = Readonly<{
  start: () => void | Promise<void>;
  space: TSpace;
}>;
