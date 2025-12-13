import type { Observable } from 'rxjs';
import type { AnimationClip } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithRegistryService } from '@/Engine/Space';

import type { TAnimationsAsyncRegistry } from './TAnimationsAsyncRegistry';
import type { TAnimationsPack } from './TAnimationsPack';
import type { TModel3dAnimations } from './TModel3dAnimations';

export type TAnimationsService = Readonly<{
  add: (modelAnimations: TModel3dAnimations) => void;
  gltfAnimationsToPack: (animations: ReadonlyArray<AnimationClip>) => TAnimationsPack;
  added$: Observable<TModel3dAnimations>;
}> &
  TWithRegistryService<TAnimationsAsyncRegistry> &
  TDestroyable;
