import type { Scene } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin, TWithObject3d } from '@/Engine/Mixins';

import type { TSceneAccessors } from './TSceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & TSceneAccessors & TWithActiveMixin & TWithObject3d;
