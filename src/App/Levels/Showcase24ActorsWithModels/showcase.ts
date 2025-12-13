import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TAppCanvas, TEngine, TModel3d, TModel3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
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
  const { animationsService, models3dService } = space.services;
  const { onKey, onKeyCombo, isKeyPressed } = keyboardService;

  function init(): void {
    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

    // TODO perhaps should be moved inside actor
    const solderModel3d: TModel3d | undefined = models3dService.getRegistry().findByName('solder_model_entity');
    if (isNotDefined(solderModel3d)) throw new Error(`Model "solder_model_entity" doesn't exist in the registry`);
    const actions = animationsService.startAutoUpdateMixer(solderModel3d).actions;
    const runAction = actions['Run'];
    const walkAction = actions['Walk'];
    const idleAction = actions['Idle'];
    const tPoseAction = actions['TPose'];

    const fadeDuration = 0.3;

    // tPoseAction.play();
    idleAction.play();
    walkAction.play();
    walkAction.weight = 0;
    idleAction.weight = 1;
    // tPoseAction.crossFadeTo(idleAction, fadeDuration, true);
    tPoseAction.stop();

    let runModifier: boolean = false;
    onKey(KeysExtra.Shift).pressed$.subscribe((): void => void (runModifier = true));
    onKey(KeysExtra.Shift).released$.subscribe((): void => void (runModifier = false));

    onKey(KeyCode.W).pressed$.subscribe((): void => {
      if (isKeyPressed(KeysExtra.Shift)) return;
      console.log('XXX Single');
      if (!idleAction.isRunning()) idleAction.play();
      if (!walkAction.isRunning()) walkAction.play();
      idleAction.crossFadeTo(walkAction, fadeDuration, true);
    });

    // onKeyCombo(`${KeyCode.W} + ${KeysExtra.Shift}`).pressed$.subscribe((): void => {
    //   console.log('XXX Combo');
    //   // runAction.play();
    //   // idleAction.crossFadeTo(runAction, fadeDuration, true);
    // });

    onKey(KeyCode.W).released$.subscribe((): void => {
      // walkAction.crossFadeTo(idleAction, fadeDuration, true);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

// TODO debug
// function prepareCrossFade(startAction, endAction, defaultDuration) {
//   // Switch default / custom crossfade duration (according to the user's choice)
//
//   const duration = setCrossFadeDuration(defaultDuration);
//
//   // Make sure that we don't go on in singleStepMode, and that all actions are unpaused
//
//   singleStepMode = false;
//   unPauseAllActions();
//
//   // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
//   // else wait until the current action has finished its current loop
//
//   if (startAction === idleAction) {
//     executeCrossFade(startAction, endAction, duration);
//   } else {
//     synchronizeCrossFade(startAction, endAction, duration);
//   }
// }
//
// function setCrossFadeDuration(defaultDuration) {
//   // Switch default crossfade duration <-> custom crossfade duration
//
//   if (settings['use default duration']) {
//     return defaultDuration;
//   } else {
//     return settings['set custom duration'];
//   }
// }
//
// function executeCrossFade(startAction, endAction, duration) {
//   // Not only the start action, but also the end action must get a weight of 1 before fading
//   // (concerning the start action this is already guaranteed in this place)
//
//   setWeight(endAction, 1);
//   endAction.time = 0;
//
//   // Crossfade with warping - you can also try without warping by setting the third parameter to false
//
//   startAction.crossFadeTo(endAction, duration, true);
// }
//
// function setWeight(action, weight) {
//   action.enabled = true;
//   action.setEffectiveTimeScale(1);
//   action.setEffectiveWeight(weight);
// }
//
// function unPauseAllActions() {
//   actions.forEach(function (action) {
//     action.paused = false;
//   });
// }
