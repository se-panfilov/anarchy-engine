import type { Scene } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

import type { ISceneAccessors } from './ISceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & ISceneAccessors & IWithActiveMixin & IWithObject3d & IWithTagsMixin;
