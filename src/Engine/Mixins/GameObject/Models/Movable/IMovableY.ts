import type { IWithPosition } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableY = IWithPosition &
  Readonly<{
    addY: (y: number) => number;
    setY: (y: number) => number;
    getY: () => number;
  }>;
