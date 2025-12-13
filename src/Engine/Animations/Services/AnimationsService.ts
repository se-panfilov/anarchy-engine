import type { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { AnimationClip } from 'three';
import { AnimationMixer } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { AnimationsLoader } from '@/Engine/Animations/Loader';
import type { TAnimationActions, TAnimationActionsPack, TAnimationsLoader, TAnimationsResourceAsyncRegistry, TAnimationsService, TModel3dAnimations } from '@/Engine/Animations/Models';
import type { TDelta } from '@/Engine/Loop';
import type { TDisposable, TSpaceLoops } from '@/Engine/Mixins';
import type { TModel3d, TRawModel3d } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function AnimationsService(resourcesRegistry: TAnimationsResourceAsyncRegistry, { renderLoop }: TSpaceLoops): TAnimationsService {
  const animationsLoader: TAnimationsLoader = AnimationsLoader(resourcesRegistry);
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();
  const subscriptions: Map<AnimationMixer, Subscription> = new Map<AnimationMixer, Subscription>();
  const disposable: ReadonlyArray<TDisposable> = [resourcesRegistry];
  const abstractService: TAbstractService = AbstractService(disposable);

  //If you want to create an animation action for a model that already has actions (and a mixer), provide that mixer here
  function createActions(model: TRawModel3d, animations: ReadonlyArray<AnimationClip> = [], customMixer?: AnimationMixer): TAnimationActionsPack {
    const mixer: AnimationMixer = customMixer ?? new AnimationMixer(model);
    const actions: TWriteable<TAnimationActions> = {};
    // eslint-disable-next-line functional/immutable-data
    animations.forEach((clip: AnimationClip): void => void (actions[clip.name] = mixer.clipAction(clip)));
    return { model, mixer, actions };
  }

  function startAutoUpdateMixer(model3d: TModel3d, updateTick$: Observable<TDelta> = renderLoop.tick$): TAnimationActionsPack | never {
    const mixer = model3d.getMixer();
    if (isNotDefined(mixer)) throw new Error(`Mixer is not defined for model3d (name: ${model3d.getName()}, id: ${model3d.id}})`);

    const subs$: Subscription = updateTick$.subscribe((delta) => mixer.update(delta));
    if (isDefined(subscriptions.get(mixer)))
      throw new Error(`AnimationsService: Cannot auto-update mixer twice: subscribe is already exist. Mixer relates to the mode3d (name: ${model3d.getName()}, id: ${model3d.id}})`);

    subscriptions.set(mixer, subs$);
    return { model: model3d.getRawModel3d(), mixer, actions: model3d.getActions() };
  }

  function stopAutoUpdateMixer(mixer: AnimationMixer): void | never {
    const subs$: Subscription | undefined = subscriptions.get(mixer);
    if (isNotDefined(subs$)) throw new Error('Mixer is not defined');
    subs$.unsubscribe();
    subscriptions.delete(mixer);
  }

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    added$.complete();
    added$.unsubscribe();
    subscriptions.forEach((subs$: Subscription): void => subs$.unsubscribe());

    resourcesRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    createActions,
    added$: added$.asObservable(),
    startAutoUpdateMixer,
    stopAutoUpdateMixer,
    loadAsync: animationsLoader.loadAsync,
    loadFromConfigAsync: animationsLoader.loadFromConfigAsync,
    getResourceRegistry: (): TAnimationsResourceAsyncRegistry => resourcesRegistry
  });
}
