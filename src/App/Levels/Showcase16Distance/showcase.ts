import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ICameraRegistry, IEngine, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, KeyCode, mpsSpeed } from '@/Engine';

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

  async function init(): Promise<void> {
    const car: IActorWrapperAsync | undefined = await findByNameAsync('car');

    if (isNotDefined(car)) throw new Error('Actor "car" is not defined');

    onKey(KeyCode.W).pressing$.subscribe(({ delta }): void => {
      console.log(mpsSpeed(-10, delta));
      void car.addZ(mpsSpeed(-10, delta));
    });
  }

  function start(): void {
    engine.start();
    void init();
  }

  return { start, space };
}
