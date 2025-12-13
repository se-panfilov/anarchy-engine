import type { Scene } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

import type { ISceneAccessors } from './ISceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & ISceneAccessors & IWithActiveMixin & TWithObject3d & TWithTagsMixin;
