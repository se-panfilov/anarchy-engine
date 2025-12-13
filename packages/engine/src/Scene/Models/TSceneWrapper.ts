import type { Scene } from 'three';

import type { TWrapper } from '@/Abstract';
import type { TWithActiveMixin, TWithObject3d } from '@/Mixins';

import type { TSceneAccessors } from './TSceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & TSceneAccessors & TWithActiveMixin & TWithObject3d;
