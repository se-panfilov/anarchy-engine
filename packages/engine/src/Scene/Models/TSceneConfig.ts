import type { TObject3DParams, TObject3DPropConfig } from '@Engine/ThreeLib';
import type { Vector3Like } from 'three';

import type { TSceneParams } from './TSceneParams';

export type TSceneConfig = Omit<TSceneParams, keyof TObject3DParams | 'background'> &
  Readonly<{
    position?: Vector3Like; //a scene may have an optional position
    background?: string;
  }> &
  Omit<TObject3DPropConfig, 'position'>;
