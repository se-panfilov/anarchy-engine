import GUI from 'lil-gui';
import type { AnimationAction } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TAppCanvas, TAudioWrapper, TEngine, TModel3d, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const gui: GUI = new GUI();

  function init(): void {
    initMutant('mutant_actor_1', space.services);
    initMusicWithControls('bg_music', 'Background music', gui, space.services);
    initMusicWithControls('monster_singing', 'Positional music', gui, space.services);
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

function initMusicWithControls(name: string, folderName: string, gui: GUI, { audioService }: TSpaceServices): void {
  const folder: GUI = gui.addFolder(folderName);
  const bgMusic: TAudioWrapper | undefined = audioService.getRegistry().findByName(name);
  if (isNotDefined(bgMusic)) throw new Error('Background music is not found');

  const state = {
    playMusic: (): void => bgMusic.play$.next(true),
    pauseMusic: (): void => bgMusic.pause$.next(true),
    resumeMusic: (): void => bgMusic.pause$.next(false),
    stopMusic: (): void => bgMusic.play$.next(false),
    seekPlus: (): void => {
      const currentTime: number = bgMusic.seek$.getValue();
      bgMusic.seek$.next(currentTime + 10);
    },
    seekMinus: (): void => {
      const currentTime: number = bgMusic.seek$.getValue();
      bgMusic.seek$.next(currentTime - 10);
    },
    loop: (): void => {
      const currentLoop: boolean = bgMusic.loop$.getValue();
      bgMusic.loop$.next(!currentLoop);
    },
    volume: 1,
    progress: 0
  };

  folder.add(state, 'playMusic').name('Play background music');
  folder.add(state, 'pauseMusic').name('Pause background music');
  folder.add(state, 'resumeMusic').name('Resume background music');
  folder.add(state, 'stopMusic').name('Stop background music');
  folder.add(state, 'seekPlus').name('Seek +10s');
  folder.add(state, 'seekMinus').name('Seek -10s');
  folder.add(state, 'loop').name('loop');
  folder
    .add(state, 'volume', 0, 1)
    .name('Volume')
    .onChange((value: number): void => {
      bgMusic.volume$.next(value);
    });
}
