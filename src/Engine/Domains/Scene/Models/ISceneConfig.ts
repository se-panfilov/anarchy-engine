import type { SceneTag } from '@/Engine/Domains/Scene/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';

import type { ISceneProps } from './ISceneProps';

export type ISceneConfig = Omit<ISceneProps, 'background'> &
  Readonly<{
    position?: IWithCoordsXYZ; //scene may have an optional position
    background?: string;
  }> &
  Omit<IObject3DPropConfig, 'position'> &
  IWithReadonlyTags<SceneTag>;
