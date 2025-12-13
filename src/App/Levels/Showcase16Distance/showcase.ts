import type { TShowcase } from '@/App/Levels/Models';
import type { TActorRegistry, TActorWrapper, TAppCanvas, TCameraRegistry, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isNotDefined, KeyCode, mpsSpeed, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService, loopService, mouseService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByName } = actorRegistry;
  const { onKey } = keyboardService;

  const { clickLeftRelease$ } = mouseService;

  function init(): void {
    const car: TActorWrapper | undefined = findByName('car');
    if (isNotDefined(car)) throw new Error('Actor "car" is not defined');

    let isMove: boolean = false;
    let isTimerStarted: boolean = false;

    clickLeftRelease$.subscribe((): void => {
      if (!isMove) isMove = true;
    });

    //Move by click once
    loopService.tick$.subscribe(({ delta }): void => {
      if (isMove && !isTimerStarted) {
        isTimerStarted = true;
        console.time('move');
      }

      if (car.entity.position.z <= -50) {
        console.timeEnd('move');
        isMove = false;
        // eslint-disable-next-line functional/immutable-data
        car.entity.position.z = 50;
        return;
      }

      if (isMove) {
        // eslint-disable-next-line functional/immutable-data
        car.entity.position.z -= mpsSpeed(10, delta);
      }
    });

    //Move by pressing
    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => {
      if (!isTimerStarted) {
        isTimerStarted = true;
        console.time('move');
      }

      if (car.entity.position.z <= -50) {
        console.timeEnd('move');
        // eslint-disable-next-line functional/immutable-data
        car.entity.position.z = 50;
        return;
      }

      // eslint-disable-next-line functional/immutable-data
      car.entity.position.z -= mpsSpeed(10, delta.delta);
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
