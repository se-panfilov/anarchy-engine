import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { ICameraParams } from './ICameraParams';

export type ICameraConfig = Omit<ICameraParams, 'rotation' | 'position' | 'lookAt'> &
  Readonly<{
    rotation: IWithCoordsXYZ;
    position: IWithCoordsXYZ;
    lookAt?: IWithCoordsXYZ;
  }>;
