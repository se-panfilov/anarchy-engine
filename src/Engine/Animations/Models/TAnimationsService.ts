import type { Observable } from 'rxjs';
import type { AnimationClip, Group, Mesh } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationActionsPack } from './TAnimationActionsPack';
import type { TAnimationsPack } from './TAnimationsPack';
import type { TModel3dAnimations } from './TModel3dAnimations';

export type TAnimationsService = Readonly<{
  createActions: (model: Mesh | Group, animations?: TAnimationsPack) => TAnimationActionsPack;
  gltfAnimationsToPack: (animations: ReadonlyArray<AnimationClip>) => TAnimationsPack;
  added$: Observable<TModel3dAnimations>;
}> &
  TDestroyable;
