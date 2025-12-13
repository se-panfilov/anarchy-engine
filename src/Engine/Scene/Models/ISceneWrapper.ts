import type { Scene } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IWithActive, IWithObject3d, IWithTags } from '@/Engine/Mixins';

import type { ISceneAccessors } from './ISceneAccessors';

export type ISceneWrapper = IWrapper<Scene> & ISceneAccessors & IWithActive & IWithObject3d & IWithTags<string>;
