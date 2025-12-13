import { distinctUntilChanged } from 'rxjs';
import type { AnimationAction } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TAnimationsFsmWrapper, TAppCanvas, TEngine, TModel3d, TModel3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeyCode, KeysExtra, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService, scenesService }: TSpaceServices): void {
    const models3dResourceRegistry: TModel3dResourceAsyncRegistry = models3dService.getResourceRegistry();
    const sceneW: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

    //Logging models3d loading
    models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => console.log(`Model "${name}" is loaded`, model3dSource));
  }

  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig, { beforeResourcesLoaded });
  const engine: TEngine = Engine(space);

  const { keyboardService } = engine.services;
  const { actorService, animationsService, animationsFsmService, models3dService } = space.services;
  const { onKey, isKeyPressed } = keyboardService;

  function init(): void {
    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    const fadeDuration = 0.3;

    // TODO perhaps should be moved inside actor
    const solderModel3d: TModel3d | undefined = models3dService.getRegistry().findByName('solder_model_entity');
    if (isNotDefined(solderModel3d)) throw new Error(`Model "solder_model_entity" doesn't exist in the registry`);
    const actions = animationsService.startAutoUpdateMixer(solderModel3d).actions;

    enum AnimationActions {
      Run = 'Run',
      Walk = 'Walk',
      Idle = 'Idle'
      // TPose = 'TPose'
    }

    const { Run, Walk, Idle } = AnimationActions;

    const runAction: AnimationAction = actions[Run];
    const walkAction: AnimationAction = actions[Walk];
    const idleAction: AnimationAction = actions[Idle];
    // const tPoseAction: AnimationAction = actions['TPose'];

    const solderAnimFsm: TAnimationsFsmWrapper = animationsFsmService.create({
      name: 'solder_anim_fsm',
      initial: Idle,
      transitions: [
        [Idle, Run, Run],
        [Idle, Walk, Walk],
        [Walk, Idle, Idle],
        [Walk, Run, Run],
        [Run, Walk, Walk],
        [Run, Idle, Idle]
      ]
    });

    const solderActor: TActor | undefined = actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solderActor)) throw new Error('Solder actor is not found');

    solderActor.setAnimationsFsm(solderAnimFsm);

    const { animationsFsm } = solderActor.states;
    if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

    solderAnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: string | number | symbol): void => {
      switch (state) {
        case Idle:
          walkAction.fadeOut(fadeDuration);
          runAction.fadeOut(fadeDuration);
          idleAction.reset().fadeIn(fadeDuration).play();
          break;
        case Walk:
          idleAction.fadeOut(fadeDuration);
          runAction.fadeOut(fadeDuration);
          walkAction.reset().fadeIn(fadeDuration).play();
          break;
        case Run:
          idleAction.fadeOut(fadeDuration);
          walkAction.fadeOut(fadeDuration);
          runAction.reset().fadeIn(fadeDuration).play();
          break;
        default:
          throw new Error(`Unknown state: ${String(state)}`);
      }
    });

    onKey(KeyCode.W).pressing$.subscribe((): void => {
      const action: AnimationActions.Run | AnimationActions.Walk = isKeyPressed(KeysExtra.Shift) ? Run : Walk;
      if (animationsFsm.getState() !== action) animationsFsm.send(action);
    });

    onKey(KeyCode.W).released$.subscribe((): void => animationsFsm.send(Idle));
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
