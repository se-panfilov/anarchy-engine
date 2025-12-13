import type { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { AnimationClip, Group, Mesh, Object3D } from 'three';
import { AnimationMixer } from 'three';

import type { TAnimationActions, TAnimationActionsPack, TAnimationsService, TModel3dAnimations } from '@/Engine/Animations/Models';
import type { TLoopService, TLoopTimes } from '@/Engine/Loop';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function AnimationsService(loopService: TLoopService): TAnimationsService {
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();
  const subscriptions: Map<AnimationMixer, Subscription> = new Map<AnimationMixer, Subscription>();

  function createActions(model: Group | Mesh | Object3D, animations: ReadonlyArray<AnimationClip> = []): TAnimationActionsPack {
    const mixer = new AnimationMixer(model);
    const actions: TWriteable<TAnimationActions> = {};
    // eslint-disable-next-line functional/immutable-data
    animations.forEach((clip: AnimationClip): void => void (actions[clip.name] = mixer.clipAction(clip)));
    return { model, mixer, actions };
  }

  function startAutoUpdateMixer(modelF: TModel3d, updateTick$: Observable<TLoopTimes> = loopService.tick$): TAnimationActionsPack | never {
    const mixer = modelF.getMixer();
    if (isNotDefined(mixer)) throw new Error(`Mixer is not defined for model facade (name: ${modelF.getName()}, id: ${modelF.id}})`);

    const subs$: Subscription = updateTick$.subscribe(({ delta }) => mixer.update(delta));
    if (isDefined(subscriptions.get(mixer)))
      throw new Error(`AnimationsService: Cannot auto-update mixer twice: subscribe is already exist. Mixer relates to the model facade (name: ${modelF.getName()}, id: ${modelF.id}})`);

    subscriptions.set(mixer, subs$);
    return { model: modelF.getRawModel3d(), mixer, actions: modelF.getActions() };
  }

  function stopAutoUpdateMixer(mixer: AnimationMixer): void | never {
    const subs$ = subscriptions.get(mixer);
    if (isNotDefined(subs$)) throw new Error('Mixer is not defined');
    subs$.unsubscribe();
    subscriptions.delete(mixer);
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    added$.complete();
    added$.unsubscribe();
    subscriptions.forEach((subs$) => subs$.unsubscribe());
  });

  return {
    createActions,
    added$: added$.asObservable(),
    startAutoUpdateMixer,
    stopAutoUpdateMixer,
    ...destroyable
  };
}
