import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TEuler3dConfig } from '../../Euler/Models/TEuler3dConfig';
import type { IObject3DParams } from './IObject3DParams';

export type TObject3DPropConfig = Omit<IObject3DParams, 'layers' | 'animations' | 'position' | 'rotation' | 'scale'> &
  Readonly<{
    layers?: number;
    animations?: ReadonlyArray<string>;
    position: TWithCoordsXYZ;
    rotation?: TEuler3dConfig;
    scale?: TWithCoordsXYZ;
  }>;
