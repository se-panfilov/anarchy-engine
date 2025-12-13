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
  const audio: GUI = gui.addFolder('Moving mode');

  function init(): void {
    const fadeDuration = 0.3;

    initMutant1('mutant_actor_1', fadeDuration, space.services);

    const bgMusic: TAudioWrapper | undefined = audioService.getRegistry().findByName('bg_music');
    if (isNotDefined(bgMusic)) throw new Error('Background music is not found');

    const state = {
      playBgMusic: (): void => bgMusic.play$.next(true),
      pauseBgMusic: (): void => bgMusic.pause$.next(true),
      resumeBgMusic: (): void => bgMusic.pause$.next(false),
      stopBgMusic: (): void => bgMusic.play$.next(false)
    };

    audio.add(state, 'playBgMusic').name('Play background music');
    audio.add(state, 'pauseBgMusic').name('Pause background music');
    audio.add(state, 'resumeBgMusic').name('resume background music');
    audio.add(state, 'stopBgMusic').name('Stop background music');
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
