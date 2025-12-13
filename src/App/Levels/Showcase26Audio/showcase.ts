import GUI from 'lil-gui';
import type { AnimationAction, AudioListener } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TAnyAudioWrapper, TAppCanvas, TAudio3dWrapper, TCameraWrapper, TDebugAudioRenderer, TEngine, TModel3d, TSceneWrapper, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { DebugAudioRenderer, Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const gui: GUI = new GUI();

  const { scenesService, audioService, cameraService } = space.services;
  const { audioLoop } = space.loops;
  const mainListener: AudioListener | undefined = audioService.getMainListener();

  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Active camera listener is not found');
  if (isNotDefined(mainListener)) throw new Error('Main audio listener is not found');
  // TODO 11.0.0: Connect listener to the camera (throw an error if listener is not connected to anything). This should happen in camera domain. Make sure cameras creates after the audio entities
  // TODO 11.0.0: add method to the wrapper, to add listener to the camera (also let it work from config)
  camera.entity.add(mainListener);

  function init(): void {
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error('Showcase: No active scene is not found');

    initMutant('mutant_actor_1', space.services);
    initMusicWithControls('bg_music', 'Background music', gui, space.services);
    const singing: TAudio3dWrapper = initMusicWithControls('monster_singing', 'Positional music', gui, space.services) as TAudio3dWrapper;
    const debugAudioRenderer: TDebugAudioRenderer = DebugAudioRenderer(singing, scene, audioLoop);

    // debugAudioRenderer.enabled$.next(!debugAudioRenderer.enabled$.value);
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function initMutant(actorName: string, { animationsService, actorService }: TSpaceServices): void {
  const actor: TActor | undefined = actorService.getRegistry().findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not found`);

  const model3d: TModel3d = actor.model3d;
  const fadeDuration = 0.3;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];
  danceAction.reset().fadeIn(fadeDuration).play();
}

function initMusicWithControls(name: string, folderName: string, gui: GUI, { audioService }: TSpaceServices): TAnyAudioWrapper {
  const folder: GUI = gui.addFolder(folderName);
  const audioW: TAnyAudioWrapper | undefined = audioService.getRegistry().findByName(name);
  if (isNotDefined(audioW)) throw new Error('Background music is not found');

  const state = {
    playMusic: (): void => audioW.play$.next(true),
    pauseMusic: (): void => audioW.pause$.next(true),
    resumeMusic: (): void => audioW.pause$.next(false),
    stopMusic: (): void => audioW.play$.next(false),
    seekPlus: (): void => {
      const currentTime: number = audioW.seek$.getValue();
      audioW.seek$.next(currentTime + 10);
    },
    seekMinus: (): void => {
      const currentTime: number = audioW.seek$.getValue();
      audioW.seek$.next(currentTime - 10);
    },
    loop: (): void => {
      const currentLoop: boolean = audioW.loop$.getValue();
      audioW.loop$.next(!currentLoop);
    },
    volume: 1,
    progress: 0
  };

  folder.add(state, 'playMusic').name('Play');
  folder.add(state, 'pauseMusic').name('Pause');
  folder.add(state, 'resumeMusic').name('Resume');
  folder.add(state, 'stopMusic').name('Stop');
  folder.add(state, 'seekPlus').name('Seek +10s');
  folder.add(state, 'seekMinus').name('Seek -10s');
  folder.add(state, 'loop').name('Loop');
  folder
    .add(state, 'volume', 0, 1)
    .name('Volume')
    .onChange((value: number): void => {
      audioW.volume$.next(value);
    });

  return audioW;
}
