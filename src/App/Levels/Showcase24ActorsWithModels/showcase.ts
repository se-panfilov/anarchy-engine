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

    const runAction = actions[Run];
    const walkAction = actions[Walk];
    const idleAction = actions[Idle];
    // const tPoseAction = actions['TPose'];

    const solderAnimFsm: TAnimationsFsmWrapper = animationsFsmService.create({
      id: 'solder_animation_fsm',
      initial: Idle,
      states: {
        [Idle]: { on: { [Walk]: Walk, [Run]: Run } },
        [Walk]: { on: { [Idle]: Idle, [Run]: Run } },
        [Run]: { on: { [Idle]: Idle, [Walk]: Walk } }
      }
    });

    const solderActor: TActor | undefined = actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solderActor)) throw new Error('Solder actor is not found');
    solderActor.setAnimationsFsm(solderAnimFsm.createActorFsm());

    const { animationsFsmActor } = solderActor.states;

    if (isNotDefined(animationsFsmActor)) throw new Error('Animations FSM is not defined');

    let prev: any = '';
    animationsFsmActor.subscribe((state): void => {
      if (prev === state.value) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      prev = state.value;

      if (state.matches(Idle)) {
        walkAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        idleAction.reset().fadeIn(fadeDuration).play();
      } else if (state.matches(Walk)) {
        idleAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        walkAction.reset().fadeIn(fadeDuration).play();
      } else if (state.matches(Run)) {
        idleAction.fadeOut(fadeDuration);
        walkAction.fadeOut(fadeDuration);
        runAction.reset().fadeIn(fadeDuration).play();
      }
    });

    onKey(KeyCode.W).pressing$.subscribe((): void => {
      const type = isKeyPressed(KeysExtra.Shift) ? Run : Walk;
      if (animationsFsmActor.getSnapshot().value !== type) animationsFsmActor?.send({ type });
    });

    onKey(KeyCode.W).released$.subscribe((): void => {
      animationsFsmActor.send({ type: Idle });
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
