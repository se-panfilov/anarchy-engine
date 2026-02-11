import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TWithActiveMixin, TWithObject3d } from '@Anarchy/Engine/Mixins';
import type { Scene } from 'three';

import type { TSceneAccessors } from './TSceneAccessors';

export type TSceneWrapper = TWrapper<Scene> & TSceneAccessors & TWithActiveMixin & TWithObject3d;
