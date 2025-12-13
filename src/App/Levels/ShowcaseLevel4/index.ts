import type { IShowcase } from '@/App/Levels/Models';
import { ambientContext, IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig, CameraTag, isNotDefined } from '@/Engine';
import { goToPosition } from '@/Engine/Utils/MoveUtils';

import levelConfig from './showcase-level-4.config.json';

//Showcase 4: Anime.js animations (easing, etc.)
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorRegistry, cameraRegistry } = level.entities;

    const topActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('top_actor');
    const centralActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('central_actor');
    const bottomActor: IActorWrapper | undefined = actorRegistry.getUniqByTag('bottom_actor');

    ambientContext.mouseClickWatcher.value$.subscribe((event) => {
      console.log(cameraRegistry.getAll()[0].getRotation());
      if (isNotDefined(topActor) || isNotDefined(centralActor) || isNotDefined(bottomActor)) throw new Error('Actors are not defined');
      goToPosition(topActor.entity, { x: 13, y: topActor.getY(), z: topActor.getZ() }, 1500, 'easeInCirc').then(() => {
        console.log('topActor is done');
      });
      goToPosition(centralActor.entity, { x: 13, y: centralActor.getY(), z: centralActor.getZ() }, 1500, 'linear');
      goToPosition(bottomActor.entity, { x: 13, y: bottomActor.getY(), z: bottomActor.getZ() }, 1500, 'easeInOutQuad');
    });
  }

  return { start, level };
}
