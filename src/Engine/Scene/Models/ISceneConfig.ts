import type { TWithCoordsXYZ, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ISceneProps } from './ISceneProps';

export type ISceneConfig = Omit<ISceneProps, 'background'> &
  Readonly<{
    position?: TWithCoordsXYZ; //scene may have an optional position
    background?: string;
  }> &
  Omit<TObject3DPropConfig, 'position'> &
  TWithReadonlyTags;
