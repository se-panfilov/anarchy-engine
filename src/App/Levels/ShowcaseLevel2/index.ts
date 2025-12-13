import { combineLatest } from 'rxjs';
import { Vector3 } from 'three';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, CameraTag, EulerWrapper, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-2.config.json';

export function showcaseLevel2(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  function start(): void {
    level.start();
    const { actorFactory, cameraFactory, cameraRegistry } = level.entities;

    // START Experiment1: custom controls ---------------
    actorFactory.create({
      type: ActorType.cube,
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      castShadow: true,
      materialParams: { color: '#5177ff' },
      tags: []
    });

    const cameraTag: string = 'showcase-2-camera';

    cameraFactory.create({
      position: Vector3Wrapper({ x: 0, y: 0, z: 0 }),
      rotation: EulerWrapper({ x: 0, y: 0, z: 0 }),
      tags: [cameraTag, CameraTag.Active]
    });

    // initialCamera.addTag(CameraTag.Active);

    const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
    combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
      const xRatio = x / width;
      const yRatio = -(y / height);
      // const xAngle = xRatio * Math.PI * 2;
      // const yAngle = yRatio * Math.PI * 2;
      // const xPosition = Math.sin(xAngle) * 5;
      // const yPosition = Math.sin(yAngle) * 5;
      // camera.getAll()[0].entity.position.setX(xPosition);
      // camera.getAll()[0].entity.position.setY(yPosition);
      // TODO (S.Panfilov) CWP Camera is always a PerspectiveCamera, is that right?

      // console.log('camera rotation', cameraRegistry.getAll()[0].entity.rotation);
      cameraRegistry.getUniqByTag(cameraTag)?.entity.position.setX(xRatio);
      cameraRegistry.getUniqByTag(cameraTag)?.entity.position.setY(yRatio);
      cameraRegistry.getUniqByTag(cameraTag)?.entity.lookAt(new Vector3(0, 0, 0));

      // const xRatio: number = x / width - 0.5;
      // const yRatio: number = -(y / height - 0.5);
      // const {camera} = level.registry
      // camera.getAll()[0].setX(xRatio * 10);
      // camera.getAll()[0].setY(yRatio);
      // camera.getAll()[0].lookAt(Vector3Wrapper({ x: 0, y: 0, z: 0 }));
    });

    // END Experiment1: custom controls ---------------
  }

  return { start, level };
}
