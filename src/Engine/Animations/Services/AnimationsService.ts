import { Subject } from 'rxjs';
import type { AnimationClip, Group, Mesh } from 'three';
import { AnimationMixer } from 'three';

import type { TAnimationActions, TAnimationActionsPack, TAnimationsPack, TAnimationsService, TModel3dAnimations } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export function AnimationsService(): TAnimationsService {
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();

  function gltfAnimationsToPack(animations: ReadonlyArray<AnimationClip>): TAnimationsPack {
    const result: TAnimationsPack = {};
    // eslint-disable-next-line functional/immutable-data
    animations.forEach((a: AnimationClip): void => void (result[a.name] = a));
    return result;
  }

  // TODO (S.Panfilov) 6.5 CWP make sure animations works
  // TODO (S.Panfilov) 8. CWP implement models load via actor (merge branch and create a new one before doing this)
  function createActions(model: Mesh | Group, animations: TAnimationsPack = {}): TAnimationActionsPack {
    const mixer = new AnimationMixer(model);
    const actions: TWriteable<TAnimationActions> = {};
    Object.entries(animations).forEach(([name, clip]: [string, AnimationClip]): void => {
      // eslint-disable-next-line functional/immutable-data
      actions[name] = mixer.clipAction(clip);
    });
    return { model, mixer, actions };
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    added$.complete();
    added$.unsubscribe();
  });

  return {
    createActions,
    added$: added$.asObservable(),
    gltfAnimationsToPack,
    ...destroyable
  };
}
