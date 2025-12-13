import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ISceneProps } from './ISceneProps';

export type ISceneConfig = Omit<ISceneProps, 'background'> &
  Readonly<{
    position?: IWithCoordsXYZ; //scene may have an optional position
    background?: string;
  }> &
  Omit<IObject3DPropConfig, 'position'> &
  IWithReadonlyTags;
