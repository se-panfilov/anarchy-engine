import type { IActorParams, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ActorTag, ActorType, buildLevelFromConfig, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-2.config.json';

export function showcaseLevel2(canvas: IAppCanvas): void {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  level.start();
  console.log(level);

  // START Experiment1: animations ---------------
  level.actor.factory.initial.create({
    type: ActorType.cube,
    position: Vector3Wrapper({ x: 0, y: 0, z: 0 }).entity,
    castShadow: true,
    materialParams: { color: '#5177ff' },
    tags: [ActorTag.Intersectable]
  } satisfies IActorParams);

  // // END Experiment1: animations ---------------
}
