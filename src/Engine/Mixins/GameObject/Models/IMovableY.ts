import type { IWithPosition } from './IWithPosition';

export type IMovableY = IWithPosition &
  Readonly<{
    addY: (y: number) => number;
    setY: (y: number) => number;
    getY: () => number;
  }>;
