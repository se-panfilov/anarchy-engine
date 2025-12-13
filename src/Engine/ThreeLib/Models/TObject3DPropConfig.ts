import type { QuaternionLike, Vector3Like } from 'three';

import type { TEulerLike } from '@/Engine/ThreeLib';

import type { TObject3DParams } from './TObject3DParams';

export type TObject3DPropConfig = Omit<TObject3DParams, 'layers' | 'animations' | 'position' | 'rotation' | 'scale'> &
  Readonly<{
    layers?: number;
    // Animations is a  responsibilities of Model3d and Animations domains, here we do nothing with that
    // animations?: ReadonlyArray<string>;
    position: Vector3Like;
    rotation?: TEulerLike | QuaternionLike;
    scale?: Vector3Like;
  }>;
