import type { Observable } from 'rxjs';
import type { AnimationClip, AnimationMixer, Group, Mesh, Object3D } from 'three';

import type { TLoopTimes } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';

import type { TAnimationActionsPack } from './TAnimationActionsPack';
import type { TModel3dAnimations } from './TModel3dAnimations';

export type TAnimationsService = Readonly<{
  createActions: (model: Group | Mesh | Object3D, animations?: ReadonlyArray<AnimationClip>) => TAnimationActionsPack;
  added$: Observable<TModel3dAnimations>;
  startAutoUpdateMixer: (model3d: TModel3dFacade, updateTick$?: Observable<TLoopTimes>) => TAnimationActionsPack;
  stopAutoUpdateMixer: (mixer: AnimationMixer) => void;
}> &
  TDestroyable;
