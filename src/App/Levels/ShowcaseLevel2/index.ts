import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import { IAppCanvas, ICameraWrapper, ILevel, ILevelConfig, isDefined } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, CameraTag, EulerWrapper, isNotDefined, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-2.config.json';

export function showcaseLevel2(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorFactory, cameraFactory, cameraRegistry } = level.entities;

    // START Experiment1: custom controls ---------------
    const actor = actorFactory.create({
      type: ActorType.cube,
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      castShadow: true,
      materialParams: { color: '#5177ff' },
      tags: []
    });

    const camera: ICameraWrapper = cameraFactory.create({
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      rotation: EulerWrapper({ x: 0, y: 0, z: 0 }),
      lookAt: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      tags: [CameraTag.Active]
    });

    const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
    combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      if (isNotDefined(camera)) return;

      const xRatio: number = x / width;
      const yRatio: number = -(y / height);
      // const xAngle: number = xRatio * Math.PI * 2;
      // const yAngle: number = yRatio * Math.PI * 2;
      // const xPosition: number = Math.sin(xAngle) * 5;
      // const yPosition: number = Math.sin(yAngle) * 5;
      // camera.getAll()[0].entity.position.setX(xPosition);
      // camera.getAll()[0].entity.position.setY(yPosition);

      // console.log('camera rotation', cameraRegistry.getAll()[0].entity.rotation);
      // camera.setX(xRatio);
      // camera.setX(xRatio * 30);
      // camera.setY(yRatio * 30);
      console.log(cameraRegistry.getAll()[0]?.entity.position);
      cameraRegistry.getAll()[0]?.entity.position.setX(xRatio * 30);
      // cameraRegistry.getAll()[0]?.entity.position.setY(yRatio);
      camera.lookAt(actor.getPosition());
    });

    // END Experiment1: custom controls ---------------
  }

  return { start, level };
}
