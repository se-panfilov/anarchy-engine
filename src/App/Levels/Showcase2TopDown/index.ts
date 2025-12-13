import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorParams, IAppCanvas, ICameraWrapper, ISpace, ISpaceConfig } from '@/Engine';
import { ActorType, ambientContext, buildSpaceFromConfig, EulerWrapper, isNotDefined, MaterialType, mouseService, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase-2-top-down.config.json';

//Showcase 2: Top-down controls with dynamic actors and camera creation
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);

  function start(): void {
    space.start();
    const { actorFactory, cameraFactory } = space.entities;

    const actorDefaultParams: IActorParams = {
      type: ActorType.cube,
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      castShadow: true,
      material: { type: MaterialType.Toon, params: { color: '#5177ff' } },
      tags: []
    };

    const centralActorTag: string = 'central';

    const actorParams1: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 2, z: 0 }) };
    const actorParams2: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 0, z: 0 }) };
    const actorParams3: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 0, y: 1, z: 0 }), tags: [centralActorTag] };
    const actorParams4: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 2, z: 0 }) };
    const actorParams5: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 0, z: 0 }) };

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    [actorParams1, actorParams2, actorParams3, actorParams4, actorParams5].forEach(actorFactory.createAsync);

    const camera: ICameraWrapper = cameraFactory.create({
      position: Vector3Wrapper({ x: 0, y: 0, z: 3 }),
      rotation: EulerWrapper({ x: 0, y: 0, z: 0 }),
      tags: []
    });
    camera.setActive(true);

    const { screenSizeWatcher } = ambientContext;
    combineLatest([mouseService.position$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = x / width - 0.5;
      const yRatio: number = -(y / height - 0.5);
      camera.setX(xRatio * 5);
      camera.setY(yRatio * 5);
    });
  }

  return { start, space };
}
