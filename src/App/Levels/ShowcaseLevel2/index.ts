import type { IActorParams, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorType, ambientContext, buildLevelFromConfig, IMousePosition, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-2.config.json';

export function showcaseLevel2(canvas: IAppCanvas): void {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  level.start();

  //debug
  console.log(level);

  // START Experiment1: custom controls ---------------
  level.actor.factory.initial.create({
    type: ActorType.cube,
    position: Vector3Wrapper({ x: 0, y: 0, z: 0 }).entity,
    castShadow: true,
    materialParams: { color: '#5177ff' },
    tags: []
  } satisfies IActorParams);

  // ambientContext.mousePositionWatcher.value$.subscribe(({ x, y }: IMousePosition): void => {
  //   // const { camera } = level;
  //   // const { width, height } = canvas;
  //   // const xRatio = x / width;
  //   // const yRatio = y / height;
  //   // const xAngle = xRatio * Math.PI * 2;
  //   // const yAngle = yRatio * Math.PI * 2;
  //   // const xPosition = Math.sin(xAngle) * 5;
  //   // const yPosition = Math.sin(yAngle) * 5;
  //   // const zPosition = Math.cos(xAngle) * 5;
  //   // camera.registry.initial.getAll()[0].entity.position.set(xPosition, yPosition, zPosition);
  //   // camera.registry.initial.getAll()[0].entity.lookAt(0, 0, 0);
  //
  //   camera.registry.initial.getAll()[0].setPosition()
  //
  // });
  // level.camera.position.set(0, 0, 5);
  // // END Experiment1: custom controls ---------------
}
