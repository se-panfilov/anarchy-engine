import type { IWithPositionXY } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableY = IWithPositionXY &
  Readonly<{
    addY: (y: number) => number;
    setY: (y: number) => number;
    getY: () => number;
  }>;
