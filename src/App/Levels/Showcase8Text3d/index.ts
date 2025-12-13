import './fonts.css';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAnimationParams, IAppCanvas, ISpace, ISpaceConfig, IText3dWrapper, IWithCoordsXZ } from '@/Engine';
import { buildSpaceFromConfig, createCirclePathXZ, Easing, EulerWrapper, generateAnglesForCircle, mouseService, standardMoverService, TextType, Vector3Wrapper } from '@/Engine';

import spaceConfig from './showcase-8-text-3d.config.json';

//Showcase 8: Text 3d
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { textFactory } = space.entities;

  textFactory.create({
    type: TextType.Text3d,
    text: '3D text (RubikDoodleTriangles)',
    position: Vector3Wrapper({ x: -4, y: 2, z: 0 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#000000',
      fontSize: '0.2rem',
      backgroundColor: '#ff0000',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    },
    tags: []
  });

  textFactory.create({
    type: TextType.Text3d,
    text: 'RubikScribble',
    position: Vector3Wrapper({ x: -5, y: 12, z: 6 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '0.2rem',
      fontFamily: '"RubikScribble", sans-serif'
    },
    tags: []
  });

  const floatingText: IText3dWrapper = textFactory.create({
    type: TextType.Text3d,
    text: 'LongCang',
    position: Vector3Wrapper({ x: -10, y: 8, z: -8 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '0.2rem',
      fontFamily: '"LongCang", sans-serif'
    },
    tags: []
  });

  const floatingText2: IText3dWrapper = textFactory.create({
    type: TextType.Text3d,
    text: 'VarelaRound',
    position: Vector3Wrapper({ x: -15, y: 6, z: -14 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '0.2rem',
      fontFamily: '"VarelaRound", sans-serif'
    },
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

  mouseService.clickLeftRelease$.subscribe(() => {
    void standardMoverService.goByPath(floatingText, circlePathXZ, { ...animationParams, easing: Easing.Linear });
    setTimeout(() => {
      void standardMoverService.goByPath(floatingText2, circlePathXZ2, { ...animationParams, easing: Easing.Linear });
    }, 1000);
  });

  return { start: space.start, space };
}
