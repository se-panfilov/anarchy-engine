import type { TShowcase } from '@/App/Levels/Models';
import { addGizmo } from '@/App/Levels/Utils';
import type { TActor, TActorRegistry, TAppCanvas, TCameraRegistry, TEngine, TSpace, TSpaceConfig } from '@/Engine';
import { ambientContext, Engine, isNotDefined, KeyCode, metersPerSecond, mpsSpeed, spaceService } from '@/Engine';

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
    const sphere: TActor | undefined = findByName('sphere_actor');
    if (isNotDefined(sphere)) throw new Error('Actor "sphere_actor" is not defined');

    addGizmo(space.services, ambientContext.screenSizeWatcher, { placement: 'bottom-left' });

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

      if (sphere.drive.getPosition().z <= -50) {
        console.timeEnd('move');
        isMove = false;
        sphere.drive.default.setZ(50);
        return;
      }

      if (isMove) {
        sphere.drive.default.setZ(sphere.drive.getPosition().z - mpsSpeed(metersPerSecond(10), delta));
      }
    });

    //Move by pressing
    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => {
      if (!isTimerStarted) {
        isTimerStarted = true;
        console.time('move');
      }

      if (sphere.drive.getPosition().z <= -50) {
        console.timeEnd('move');
        // eslint-disable-next-line functional/immutable-data
        sphere.drive.default.setZ(50);
        return;
      }

      sphere.drive.default.setZ(sphere.drive.getPosition().z - mpsSpeed(metersPerSecond(10), delta.delta));
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
