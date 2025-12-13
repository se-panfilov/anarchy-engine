import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TEuler3dConfig } from '../../Euler/Models/TEuler3dConfig';
import type { TObject3DParams } from './TObject3DParams';

export type TObject3DPropConfig = Omit<TObject3DParams, 'layers' | 'animations' | 'position' | 'rotation' | 'scale'> &
  Readonly<{
    layers?: number;
    // TODO ANIMATIONS: animations are not supported at the moment (should be an array of names that relates to a pre-loaded array of AnimationClip)
    // animations?: ReadonlyArray<string>;
    position: TWithCoordsXYZ;
    rotation?: TEuler3dConfig;
    scale?: TWithCoordsXYZ;
  }>;
