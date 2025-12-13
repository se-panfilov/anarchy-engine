import type { IShowcase } from '@/App/Levels/Models';
import { buildSpaceFromConfig, Engine, IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ICameraRegistry, IEngine, isNotDefined, ISpace, ISpaceConfig, mouseService, mpsSpeed } from '@/Engine';

import spaceConfig from './showcase.json';

//Showcase 16: Distance
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const engine: IEngine = Engine(space);
  const { keyboardService } = engine.services;

  const { actorService, cameraService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: ICameraRegistry = cameraService.getRegistry();
  if (isNotDefined(actorRegistry)) throw new Error('Actor registry is not defined');
  if (isNotDefined(cameraRegistry)) throw new Error('Camera registry is not defined');
  const { findByNameAsync } = actorRegistry;
  const { onKey } = keyboardService;

  const { clickLeftRelease$ } = mouseService;

  async function init(): Promise<void> {
    const car: IActorWrapperAsync | undefined = await findByNameAsync('car');
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
        // car.entity.position.z -= 10 * delta;
        // eslint-disable-next-line functional/immutable-data
        car.entity.position.z -= mpsSpeed(10, delta);
      }
    });

    //Move by pressing
    // onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => {
    //   console.log(mpsSpeed(-10, delta));
    //   void car.addZ(mpsSpeed(-10, delta));
    // });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
