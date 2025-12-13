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
  const { onKey, onKeyCombo, isKeyPressed } = keyboardService;

  function init(): void {
    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    const fadeDuration = 0.3;

    // TODO perhaps should be moved inside actor
    const solderModel3d: TModel3d | undefined = models3dService.getRegistry().findByName('solder_model_entity');
    if (isNotDefined(solderModel3d)) throw new Error(`Model "solder_model_entity" doesn't exist in the registry`);
    const actions = animationsService.startAutoUpdateMixer(solderModel3d).actions;
    const runAction = actions['Run'];
    const walkAction = actions['Walk'];
    const idleAction = actions['Idle'];
    // const tPoseAction = actions['TPose'];

    const solderAnimFsm: TAnimationsFsmWrapper = animationsFsmService.create({
      id: 'solder_animation_fsm',
      initial: 'idle',
      states: {
        idle: { on: { WALK: 'walk', RUN: 'run' } },
        walk: { on: { IDLE: 'idle', RUN: 'run' } },
        run: { on: { IDLE: 'idle', WALK: 'walk' } }
      }
    });

    const solderActor: TActor | undefined = actorService.getRegistry().findByName('solder_actor_1');
    if (isNotDefined(solderActor)) throw new Error('Solder actor is not found');
    solderActor.setAnimationsFsm(solderAnimFsm);

    if (isNotDefined(solderActor.states.animationsFsm)) throw new Error('Animations FSM is not defined');

    let prev: any = '';
    solderActor.states.animationsFsm.subscribe((state) => {
      if (prev === state.value) return;
      prev = state.value;

      console.log('XXX state', state.value);
      if (state.matches('idle')) {
        walkAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        idleAction.reset().fadeIn(fadeDuration).play();
      } else if (state.matches('walk')) {
        idleAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        walkAction.reset().fadeIn(fadeDuration).play();
      } else if (state.matches('run')) {
        idleAction.fadeOut(fadeDuration);
        walkAction.fadeOut(fadeDuration);
        runAction.reset().fadeIn(fadeDuration).play();
      }
    });

    let isRunning: boolean = false;

    onKey(KeyCode.W).pressing$.subscribe((): void => {
      // if (isKeyPressed(KeysExtra.Shift)) return;
      const type = isRunning ? 'RUN' : 'WALK';
      console.log('XXX', type);
      if (solderActor.states.animationsFsm?.getSnapshot().value !== type.toLocaleLowerCase()) solderActor.states.animationsFsm?.send({ type });
    });

    onKey(KeysExtra.Shift).pressed$.subscribe((): void => {
      isRunning = true;
    });

    onKey(KeysExtra.Shift).released$.subscribe((): void => {
      isRunning = false;
    });

    onKey(KeyCode.W).released$.subscribe((): void => {
      solderActor.states.animationsFsm?.send({ type: 'IDLE' });
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
