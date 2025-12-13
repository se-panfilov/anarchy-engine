import './fonts.css';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAnimationParams, IAppCanvas, ILevel, ILevelConfig, ITextWrapper, IWithCoordsXZ } from '@/Engine';
import { ambientContext, buildLevelFromConfig, createCirclePathXZ, Easing, EulerWrapper, generateAnglesForCircle, standardMoverService, Vector3Wrapper } from '@/Engine';

import levelConfig from './showcase-7-text-2d.config.json';

//Showcase 7: Text 2d
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { textFactory } = level.entities;

  textFactory.create({
    text: '2D text (RubikDoodleTriangles)',
    position: Vector3Wrapper({ x: -4, y: 8, z: 0 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#000000',
    fontSize: '4rem',
    fontFamily: '"RubikDoodleTriangles", sans-serif',
    tags: []
  });

  textFactory.create({
    text: 'RubikScribble',
    position: Vector3Wrapper({ x: -5, y: 12, z: 6 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: '4rem',
    fontFamily: '"RubikScribble", sans-serif',
    tags: []
  });

  const floatingText: ITextWrapper = textFactory.create({
    text: 'LongCang',
    position: Vector3Wrapper({ x: -10, y: 8, z: -8 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: '4rem',
    fontFamily: '"LongCang", sans-serif',
    tags: []
  });

  const floatingText2: ITextWrapper = textFactory.create({
    text: 'VarelaRound',
    position: Vector3Wrapper({ x: -15, y: 6, z: -14 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    color: '#ff0000',
    fontSize: '4rem',
    fontFamily: '"VarelaRound", sans-serif',
    tags: []
  });

  const numberOfPoints: number = 160;
  const numberOfCircles: number = 1;
  const startAngle: number = 100;
  const radius: number = 15;
  const circlePathXZ: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle), radius, { x: 0, z: 0 });
  const circlePathXZ2: ReadonlyArray<IWithCoordsXZ> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle - 20), radius + 3, { x: -4, z: 0 });

  const animationParams: IAnimationParams = {
    duration: 2000,
    direction: 'normal',
    loop: true
  };

  ambientContext.mouseClickWatcher.value$.subscribe(() => {
    void standardMoverService.goByPath(floatingText, circlePathXZ, { ...animationParams, easing: Easing.Linear });
    setTimeout(() => {
      void standardMoverService.goByPath(floatingText2, circlePathXZ2, { ...animationParams, easing: Easing.Linear });
    }, 1000);
  });

  return { start: level.start, level };
}
