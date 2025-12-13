import type { IWithPosition } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableX = IWithPosition &
  Readonly<{
    addX: (x: number) => number;
    setX: (x: number) => number;
    getX: () => number;
  }>;
