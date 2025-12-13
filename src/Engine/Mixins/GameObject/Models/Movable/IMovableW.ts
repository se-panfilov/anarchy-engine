import type { IWithPositionXYZW } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableW = IWithPositionXYZW &
  Readonly<{
    addW: (z: number) => number;
    setW: (z: number) => number;
    getW: () => number;
  }>;
