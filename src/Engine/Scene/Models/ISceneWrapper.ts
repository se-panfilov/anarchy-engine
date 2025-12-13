import type { Scene } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

import type { ISceneAccessors } from './ISceneAccessors';

export type ISceneWrapper = IWrapper<Scene> & ISceneAccessors & IWithActiveMixin & IWithObject3d & IWithTagsMixin<string>;
