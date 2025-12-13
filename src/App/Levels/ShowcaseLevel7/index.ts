import type { IShowcase } from '@/App/Levels/Models';
import { EulerWrapper, IAppCanvas, ILevel, ILevelConfig, Vector3Wrapper } from '@/Engine';
import { buildLevelFromConfig } from '@/Engine';

import levelConfig from './showcase-level-7.config.json';

//Showcase 7: Fancy text
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory, textRegistry } = level.entities;

  textFactory.create({
    text: 'Dynamic text',
    position: Vector3Wrapper({ x: -4, y: 8, z: 0 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: 3,
    font: './public/RubikDoodleTriangles-Regular.ttf',
    tags: []
  });

  function start(): void {
    level.start();
  }

  return { start, level };
}
