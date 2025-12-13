import type { ISpace } from '@/Engine';

export type IShowcase = Readonly<{
  start: () => void;
  space: ISpace;
}>;
