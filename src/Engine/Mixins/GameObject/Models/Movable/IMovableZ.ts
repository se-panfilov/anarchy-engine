import type { IWithPosition } from '@/Engine/Mixins/GameObject/Models/Position';

export type IMovableZ = IWithPosition &
  Readonly<{
    addZ: (z: number) => number;
    setZ: (z: number) => number;
    getZ: () => number;
  }>;
