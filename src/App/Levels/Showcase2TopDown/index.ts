import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorParams, IAppCanvas, ICameraWrapper, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, CameraTag, EulerWrapper, isNotDefined, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-2-top-down.config.json';

//Showcase 2: Top-down controls with dynamic actors and camera creation
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorFactory, cameraFactory } = level.entities;

    const actorDefaultParams: IActorParams = {
      type: ActorType.cube,
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      castShadow: true,
      materialParams: { color: '#5177ff' },
      tags: []
    };

    const centralActorTag: string = 'central';

    const actorParams1: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 2, z: 0 }) };
    const actorParams2: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 0, z: 0 }) };
    const actorParams3: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 0, y: 1, z: 0 }), tags: [centralActorTag] };
    const actorParams4: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: -2, y: 2, z: 0 }) };
    const actorParams5: IActorParams = { ...actorDefaultParams, position: Vector3Wrapper({ x: 2, y: 0, z: 0 }) };

    [actorParams1, actorParams2, actorParams3, actorParams4, actorParams5].forEach(actorFactory.create);

    const camera: ICameraWrapper = cameraFactory.create({
      position: Vector3Wrapper({ x: 0, y: 0, z: 3 }),
      rotation: EulerWrapper({ x: 0, y: 0, z: 0 }),
      tags: [CameraTag.Active]
    });

    const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
    combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      if (isNotDefined(camera)) return;
      const xRatio: number = x / width - 0.5;
      const yRatio: number = -(y / height - 0.5);
      camera.setX(xRatio * 5);
      camera.setY(yRatio * 5);
    });
  }

  return { start, level };
}
