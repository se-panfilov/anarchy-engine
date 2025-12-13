import { Subject } from 'rxjs';
import type { AnimationClip, Group, Mesh, Object3D } from 'three';
import { AnimationMixer } from 'three';

import type { TAnimationActions, TAnimationActionsPack, TAnimationsService, TModel3dAnimations } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export function AnimationsService(): TAnimationsService {
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();

  // TODO (S.Panfilov) 6.5 CWP make sure animations works
  // TODO (S.Panfilov) 8. CWP implement models load via actor (merge branch and create a new one before doing this)
  function createActions(model: Group | Mesh | Object3D, animations: ReadonlyArray<AnimationClip> = []): TAnimationActionsPack {
    const mixer = new AnimationMixer(model);
    const actions: TWriteable<TAnimationActions> = {};
    animations.forEach((clip: AnimationClip): void => {
      // eslint-disable-next-line functional/immutable-data
      actions[clip.name] = mixer.clipAction(clip);
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
    ...destroyable
  };
}
