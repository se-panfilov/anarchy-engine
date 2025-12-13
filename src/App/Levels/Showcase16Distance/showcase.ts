import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TActorWrapperAsync, TAppCanvas, TCameraRegistry, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, KeyCode, mouseService, mpsSpeed } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService, loopService } = space.services;
  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: TCameraRegistry = cameraService.getRegistry();
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByNameAsync } = actorRegistry;
  const { onKey } = keyboardService;

  const { clickLeftRelease$ } = mouseService;

  async function init(): Promise<void> {
    const car: TActorWrapperAsync | undefined = await findByNameAsync('car');
    if (isNotDefined(car)) throw new Error('Actor "car" is not defined');

    let isMove: boolean = false;
    let isTimerStarted: boolean = false;

    clickLeftRelease$.subscribe((): void => {
      if (!isMove) isMove = true;
    });

    //Move by click once
    engine.services.loopService.tick$.subscribe(({ delta }): void => {
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
