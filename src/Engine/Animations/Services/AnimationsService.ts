import { Subject } from 'rxjs';
import type { AnimationClip } from 'three';

import type { TAnimationsAsyncRegistry, TAnimationsPack, TAnimationsService, TModel3dAnimations } from '@/Engine/Animations/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

export function AnimationsService(registry: TAnimationsAsyncRegistry): TAnimationsService {
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();

  added$.subscribe(({ url, pack }: TModel3dAnimations): void => {
    Object.entries(pack).forEach(([name, clip]: [string, TAnimationsPack]): void => {
      const old = registry.findByKey(url);
      const newValue = { ...old, [name]: clip };
      isDefined(old) ? registry.replace(url, newValue) : registry.add(url, newValue);
    });
  });

  function gltfAnimationsToPack(animations: ReadonlyArray<AnimationClip>): TAnimationsPack {
    const result: TAnimationsPack = {};
    // eslint-disable-next-line functional/immutable-data
    animations.forEach((a: AnimationClip): void => void (result[a.name] = a));
    return result;
  }

  // TODO (S.Panfilov) 6.5 CWP make sure animations works
  // TODO (S.Panfilov) 8. CWP implement models load via actor (merge branch and create a new one before doing this)
  function add(modelAnimations: TModel3dAnimations): void {
    added$.next(modelAnimations);
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
    added$.complete();
    added$.unsubscribe();
  });

  return {
    add,
    added$: added$.asObservable(),
    gltfAnimationsToPack,
    getRegistry: (): TAnimationsAsyncRegistry => registry,
    ...destroyable
  };
}
