import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TWithActiveMixin, TWithObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { Scene } from 'three';

import type { TSceneAccessors } from './TSceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & TSceneAccessors & TWithActiveMixin & TWithObject3d;
