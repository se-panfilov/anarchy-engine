import type { IWithPositionXY } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableX = IWithPositionXY &
  Readonly<{
    addX: (x: number) => number;
    setX: (x: number) => number;
    getX: () => number;
  }>;
