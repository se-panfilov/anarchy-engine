import GUI from 'lil-gui';
import type { AnimationAction, AudioListener } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type {
  TActor,
  TAnyAudioWrapper,
  TAppCanvas,
  TAudio3dWrapper,
  TCameraWrapper,
  TDebugAudioRenderer,
  TEngine,
  TLoop,
  TModel3d,
  TSceneWrapper,
  TSpace,
  TSpaceConfig,
  TSpaceServices
} from '@/Engine';
import { DebugAudioRenderer, Engine, isAudio3dWrapper, isDefined, isNotDefined, spaceService } from '@/Engine';

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

  function init(): void {
    const scene: TSceneWrapper | undefined = scenesService.findActive();
    if (isNotDefined(scene)) throw new Error('Showcase: No active scene is not found');

    initMutant('mutant_actor_1', space.services);
    initMusicWithControls('bg_music', 'Background music', gui, space.services);
    initMusicWithControls('monster_singing', 'Positional music', gui, space.services, { loop: audioLoop, scene });
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

function initMusicWithControls(name: string, folderName: string, gui: GUI, { audioService }: TSpaceServices, { loop, scene }: { loop?: TLoop; scene?: TSceneWrapper } = {}): TAnyAudioWrapper {
  const folder: GUI = gui.addFolder(folderName);
  const audioW: TAnyAudioWrapper | undefined = audioService.getRegistry().findByName(name);
  if (isNotDefined(audioW)) throw new Error('Background music is not found');
  const isDebugRendererEnabled: boolean = isAudio3dWrapper(audioW) && isDefined(loop) && isDefined(scene);

  let debugAudioRenderer: TDebugAudioRenderer | undefined;
  if (isDebugRendererEnabled) debugAudioRenderer = DebugAudioRenderer(audioW as TAudio3dWrapper, scene as TSceneWrapper, loop as TLoop);

  const state = {
    playMusic: (): void => audioW.play$.next(true),
    pauseMusic: (): void => audioW.pause$.next(true),
    resumeMusic: (): void => audioW.pause$.next(false),
    stopMusic: (): void => audioW.play$.next(false),
    seekPlus: (): void => audioW.seek$.next(audioW.seek$.getValue() + 10),
    seekMinus: (): void => audioW.seek$.next(audioW.seek$.getValue() - 10),
    loop: (): void => audioW.loop$.next(!audioW.loop$.getValue()),
    toggleDebugRendrer: (): void => debugAudioRenderer?.enabled$.next(!debugAudioRenderer?.enabled$.value),
    volume: 1,
    speed: 1,
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
  folder
    .add(state, 'speed', 1, 2)
    .name('Speed')
    .onChange((value: number): void => {
      audioW.speed$.next(value);
    });
  if (isDebugRendererEnabled) folder.add(state, 'toggleDebugRendrer').name('Debug renderer');

  return audioW;
}
