import type { IVector4 } from '@/Engine/Wrappers';

import type { IWithPositionXyzProperty } from './IWithPositionXyzProperty';

export type IWithPositionXyzwProperty = IWithPositionXyzProperty & {
  position: {
    w: number;
    set: (x: number, y: number, z: number, w: number) => IVector4;
  };
};
