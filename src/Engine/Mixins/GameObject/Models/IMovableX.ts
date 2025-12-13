import type { IWithPosition } from './IWithPosition';

export type IMovableX = IWithPosition &
  Readonly<{
    addX: (x: number) => number;
    setX: (x: number) => number;
    getX: () => number;
  }>;
