import type { Observable } from 'rxjs';
import type { AnimationClip, Group, Mesh, Object3D } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationActionsPack } from './TAnimationActionsPack';
import type { TModel3dAnimations } from './TModel3dAnimations';

export type TAnimationsService = Readonly<{
  createActions: (model: Group | Mesh | Object3D, animations?: ReadonlyArray<AnimationClip>) => TAnimationActionsPack;
  added$: Observable<TModel3dAnimations>;
}> &
  TDestroyable;
