import type { TWithCoordsXYZ, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TSceneProps } from './TSceneProps';

export type TSceneConfig = Omit<TSceneProps, 'background'> &
  Readonly<{
    position?: TWithCoordsXYZ; //scene may have an optional position
    background?: string;
  }> &
  Omit<TObject3DPropConfig, 'position'> &
  TWithReadonlyTags;
