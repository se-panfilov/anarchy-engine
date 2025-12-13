import type { Vector3Like } from 'three/src/math/Vector3';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TSceneProps } from './TSceneProps';

export type TSceneConfig = Omit<TSceneProps, 'background'> &
  Readonly<{
    position?: Vector3Like; //scene may have an optional position
    background?: string;
  }> &
  Omit<TObject3DPropConfig, 'position'> &
  TWithReadonlyTags;
