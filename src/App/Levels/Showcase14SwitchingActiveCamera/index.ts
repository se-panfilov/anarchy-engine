import type { IShowcase } from '@/App/Levels/Models';
import type { IActorAsyncRegistry, IActorWrapperAsync, IAppCanvas, ICameraRegistry, ICameraWrapper, ISpace, ISpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, isNotDefined, keyboardService, KeyCode } from '@/Engine';

import spaceConfig from './showcase-14.json';

//Showcase 14: Switching Active Camera
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { actorService, cameraService, loopService } = space.services;
  const actorRegistry: IActorAsyncRegistry = actorService.getRegistry();
  const cameraRegistry: ICameraRegistry = cameraService.getRegistry();
  const { onKey } = keyboardService;

  async function init(): Promise<void> {
    const actor: IActorWrapperAsync = await actorRegistry.findByTagAsync('intersectable');
    actor.setY(2);

    let counter: number = 1;
    const getCameraName = (): string => `cam${counter}`;
    onKey(KeyCode.D).pressing$.subscribe((): void => {
      const camera: ICameraWrapper | undefined = cameraRegistry.findByName(getCameraName());
      console.log(getCameraName(), cameraService.findActive()?.name);
      if (isNotDefined(camera)) throw new Error(`Cannot switch camera: camera ("${getCameraName()}") not found`);
      cameraService.setActive(camera.id);
      counter = counter === 1 ? 2 : 1;
    });

    loopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  function start(): void {
    space.start();
    void init();
  }

  return { start, space };
}
