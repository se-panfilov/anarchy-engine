import type { AnimationAction } from 'three';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActor, TAppCanvas, TEngine, TModel3d, TSpace, TSpaceConfig, TSpaceServices } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { controlsService } = space.services;
  const controls = controlsService.findActive();
  console.log('XXX', controls);

  function init(): void {
    const fadeDuration = 0.3;

    initMutant1('mutant_actor_1', fadeDuration, space.services);
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
