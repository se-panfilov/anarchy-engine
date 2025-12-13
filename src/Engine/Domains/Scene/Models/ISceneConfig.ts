import type { SceneTag } from '@/Engine/Domains/Scene/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ISceneProps } from './ISceneProps';

export type ISceneConfig = Omit<ISceneProps, 'background'> &
  Readonly<{
    background?: string;
  }> & IObject3DPropConfig & IWithReadonlyTags<SceneTag>
