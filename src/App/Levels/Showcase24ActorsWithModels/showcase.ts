import { distinctUntilChanged } from 'rxjs';
import type { AnimationAction } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TAppCanvas, TEngine, TFsmStates, TFsmWrapper, TModel3d, TModel3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
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
  const { onKey, isKeyPressed } = keyboardService;

  function init(): void {
    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });
    const fadeDuration = 0.3;

    const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
    const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

    solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
      if (state === 'Idle') {
        solder2AnimFsm.send('Idle');
      } else {
        solder2AnimFsm.send('Dance');
      }
    });

    onKey(KeyCode.W).pressing$.subscribe((): void => {
      const action: 'Run' | 'Walk' = isKeyPressed(KeysExtra.Shift) ? 'Run' : 'Walk';
      if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send(action);
    });

    onKey(KeyCode.W).released$.subscribe((): void => {
      solder1AnimFsm.send('Idle');
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function initSolder1(actorName: string, fadeDuration: number, { animationsService, fsmService, actorService }: TSpaceServices): TFsmWrapper {
  const actor: TActor | undefined = actorService.getRegistry().findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not found`);

  const model3d: TModel3d = actor.model3d;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

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

  const solderAnimFsm: TFsmWrapper = fsmService.create({
    name: 'solder_anim_fsm',
    type: 'animation',
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

  actor.setAnimationsFsm(solderAnimFsm);

  const { animationsFsm } = actor.states;
  if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

  animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
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

  return animationsFsm;
}

function initSolder2(actorName: string, fadeDuration: number, { animationsService, actorService }: TSpaceServices): TFsmWrapper {
  const actor: TActor | undefined = actorService.getRegistry().findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not found`);

  const model3d: TModel3d = actor.model3d;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const idleAction: AnimationAction = actions['Idle'];
  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];

  const { animationsFsm } = actor.states;
  if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

  animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    switch (state) {
      case 'Idle':
        danceAction.fadeOut(fadeDuration);
        idleAction.reset().fadeIn(fadeDuration).play();
        break;
      case 'Dance':
        idleAction.fadeOut(fadeDuration);
        danceAction.reset().fadeIn(fadeDuration).play();
        break;
      default:
        throw new Error(`Unknown state: ${String(state)}`);
    }
  });

  return animationsFsm;
}
