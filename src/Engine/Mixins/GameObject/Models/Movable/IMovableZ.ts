import type { IWithPositionXYZ } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableZ = IWithPositionXYZ &
  Readonly<{
    addZ: (z: number) => number;
    setZ: (z: number) => number;
    getZ: () => number;
  }>;
