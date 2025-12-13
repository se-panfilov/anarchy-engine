import type { Scene } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { SceneTag } from '@/Engine/Domains/Scene/Constants';
import type { IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ISceneAccessors } from './ISceneAccessors';

export type ISceneWrapper = IWrapper<Scene> &
  ISceneAccessors &
  IWithObject3d &
  IWithTags<SceneTag>;
