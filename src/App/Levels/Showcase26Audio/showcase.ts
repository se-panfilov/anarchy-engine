import GUI from 'lil-gui';
import type { AnimationAction } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TAppCanvas, TAudioWrapper, TEngine, TModel3d, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { audioService } = space.services;
  const gui: GUI = new GUI();
  const bgMusicFolder: GUI = gui.addFolder('Background music');

  function init(): void {
    const fadeDuration = 0.3;

    initMutant1('mutant_actor_1', fadeDuration, space.services);

    const bgMusic: TAudioWrapper | undefined = audioService.getRegistry().findByName('bg_music');
    if (isNotDefined(bgMusic)) throw new Error('Background music is not found');

    const state = {
      playBgMusic: (): void => bgMusic.play$.next(true),
      pauseBgMusic: (): void => bgMusic.pause$.next(true),
      resumeBgMusic: (): void => bgMusic.pause$.next(false),
      stopBgMusic: (): void => bgMusic.play$.next(false),
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

    bgMusicFolder.add(state, 'playBgMusic').name('Play background music');
    bgMusicFolder.add(state, 'pauseBgMusic').name('Pause background music');
    bgMusicFolder.add(state, 'resumeBgMusic').name('resume background music');
    bgMusicFolder.add(state, 'stopBgMusic').name('Stop background music');
    bgMusicFolder.add(state, 'seekPlus').name('Seek +10s');
    bgMusicFolder.add(state, 'seekMinus').name('Seek -10s');
    bgMusicFolder.add(state, 'loop').name('loop');
    bgMusicFolder
      .add(state, 'volume', 0, 1)
      .name('Volume')
      .onChange((value: number): void => {
        bgMusic.volume$.next(value);
      });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}

function initMutant1(actorName: string, fadeDuration: number, { animationsService, actorService }: TSpaceServices): void {
  const actor: TActor | undefined = actorService.getRegistry().findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not found`);

  const model3d: TModel3d = actor.model3d;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];
  danceAction.reset().fadeIn(fadeDuration).play();
}
