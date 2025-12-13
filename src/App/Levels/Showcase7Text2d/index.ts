import './fonts.css';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAnimationParams, IAppCanvas, IMoverService, ISpace, ISpaceConfig, ITextAnyWrapper, IWithCoordsXZ } from '@/Engine';
import { buildSpaceFromConfig, createCirclePathXZ, defaultMoverServiceConfig, Easing, EulerWrapper, generateAnglesForCircle, mouseService, TextType, Vector3Wrapper } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase-7.json';

//Showcase 7: Text 2d
export function showcase(canvas: IAppCanvas): IShowcase {
  const space: ISpace = buildSpaceFromConfig(canvas, spaceConfig as ISpaceConfig);
  const { textService, loopService } = space.services;

  textService.create({
    type: TextType.Text2d,
    text: '2D text (RubikDoodleTriangles)',
    position: Vector3Wrapper({ x: -4, y: 8, z: 0 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#000000',
      fontSize: '4rem',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    },
    tags: []
  });

  textService.create({
    type: TextType.Text2d,
    text: 'RubikScribble',
    position: Vector3Wrapper({ x: -5, y: 12, z: 6 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '4rem',
      fontFamily: '"RubikScribble", sans-serif'
    },
    tags: []
  });

  const floatingText: ITextAnyWrapper = textService.create({
    type: TextType.Text2d,
    text: 'LongCang',
    position: Vector3Wrapper({ x: -10, y: 8, z: -8 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '4rem',
      fontFamily: '"LongCang", sans-serif'
    },
    tags: []
  });

  const floatingText2: ITextAnyWrapper = textService.create({
    type: TextType.Text2d,
    text: 'VarelaRound',
    position: Vector3Wrapper({ x: -15, y: 6, z: -14 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '4rem',
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

  const moverService: IMoverService = MoverService(loopService, defaultMoverServiceConfig);

  mouseService.clickLeftRelease$.subscribe(() => {
    void moverService.goByPath(floatingText, circlePathXZ, { ...animationParams, easing: Easing.Linear });
    setTimeout(() => {
      void moverService.goByPath(floatingText2, circlePathXZ2, { ...animationParams, easing: Easing.Linear });
    }, 1000);
  });

  return { start: space.start, space };
}
