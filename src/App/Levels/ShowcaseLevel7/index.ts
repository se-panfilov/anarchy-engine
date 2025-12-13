import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { buildLevelFromConfig, EulerWrapper, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-level-7.config.json';

//Showcase 7: Fancy text
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory } = level.entities;

  textFactory.create({
    text: 'RubikDoodleTriangles',
    position: Vector3Wrapper({ x: -4, y: 8, z: 0 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: 3,
    font: './ShowcaseLevel7/font/RubikDoodleTriangles-Regular.ttf',
    tags: []
  });

  textFactory.create({
    text: 'RubikScribble',
    position: Vector3Wrapper({ x: -5, y: 12, z: 6 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: 3,
    font: './ShowcaseLevel7/font/RubikScribble-Regular.ttf',
    tags: []
  });

  textFactory.create({
    text: 'LongCang',
    position: Vector3Wrapper({ x: -10, y: 8, z: -8 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: 3,
    font: './ShowcaseLevel7/font/LongCang-Regular.ttf',
    tags: []
  });

  textFactory.create({
    text: 'VarelaRound',
    position: Vector3Wrapper({ x: -15, y: 6, z: -14 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: 3,
    font: './ShowcaseLevel7/font/VarelaRound-Regular.ttf',
    tags: []
  });

  function start(): void {
    level.start();
  }

  return { start, level };
}
