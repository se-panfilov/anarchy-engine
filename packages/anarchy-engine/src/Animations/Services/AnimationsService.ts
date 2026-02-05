import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AnimationsLoader } from '@hellpig/anarchy-engine/Animations/Loader';
import type {
  TAnimationActions,
  TAnimationActionsPack,
  TAnimationsLoader,
  TAnimationsMetaInfoRegistry,
  TAnimationsResourceAsyncRegistry,
  TAnimationsResourceConfig,
  TAnimationsSerializeResourcesDependencies,
  TAnimationsService,
  TModel3dAnimations
} from '@hellpig/anarchy-engine/Animations/Models';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import type { TDelta } from '@hellpig/anarchy-engine/Loop';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withSerializeAllResources } from '@hellpig/anarchy-engine/Mixins';
import type { TModel3d, TRawModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TSpaceLoops, TSpaceSettings } from '@hellpig/anarchy-engine/Space';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined, isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { AnimationClip } from 'three';
import { AnimationMixer } from 'three';

export function AnimationsService(
  resourcesRegistry: TAnimationsResourceAsyncRegistry,
  metaInfoRegistry: TAnimationsMetaInfoRegistry,
  { renderLoop }: TSpaceLoops,
  loadingManagerWrapper: TLoadingManagerWrapper,
  settings: TSpaceSettings
): TAnimationsService {
  const animationsLoader: TAnimationsLoader = AnimationsLoader(resourcesRegistry, metaInfoRegistry, loadingManagerWrapper, settings.threeJsSettings?.draco);
  const added$: Subject<TModel3dAnimations> = new Subject<TModel3dAnimations>();
  const subscriptions: Map<AnimationMixer, Subscription> = new Map<AnimationMixer, Subscription>();
  const disposable: ReadonlyArray<TDisposable> = [resourcesRegistry, animationsLoader];
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
    subscriptions.forEach((subs$: Subscription): void => subs$.unsubscribe());

    resourcesRegistry.destroy$.next();
  });

  return mergeAll(abstractService, withSerializeAllResources<TAnimationsResourceConfig, TAnimationsSerializeResourcesDependencies>(resourcesRegistry, { metaInfoRegistry }), {
    createActions,
    added$: added$.asObservable(),
    startAutoUpdateMixer,
    stopAutoUpdateMixer,
    loadAsync: animationsLoader.loadAsync,
    loadFromConfigAsync: animationsLoader.loadFromConfigAsync,
    getResourceRegistry: (): TAnimationsResourceAsyncRegistry => resourcesRegistry,
    getMetaInfoRegistry: (): TAnimationsMetaInfoRegistry => metaInfoRegistry
  });
}
