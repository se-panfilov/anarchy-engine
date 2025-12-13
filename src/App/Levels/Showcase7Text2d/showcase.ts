import './fonts.css';

import type { TShowcase } from '@/App/Levels/Models';
import type { TAnimationParams, TAppCanvas, TEngine, TMoverService, TSpace, TSpaceConfig, TTextAnyWrapper, TWithCoordsXZ } from '@/Engine';
import { createCirclePathXZ, defaultMoverServiceConfig, Easing, Engine, EulerWrapper, generateAnglesForCircle, spaceService, TextType, Vector3Wrapper } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { textService, loopService, mouseService } = space.services;

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

  const floatingText: TTextAnyWrapper = textService.create({
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

  const floatingText2: TTextAnyWrapper = textService.create({
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
  const circlePathXZ: ReadonlyArray<TWithCoordsXZ> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle), radius, { x: 0, z: 0 });
  const circlePathXZ2: ReadonlyArray<TWithCoordsXZ> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle - 20), radius + 3, { x: -4, z: 0 });

  const animationParams: TAnimationParams = {
    duration: 2000,
    direction: 'normal',
    loop: true
  };

  const moverService: TMoverService = MoverService(loopService, defaultMoverServiceConfig);

  mouseService.clickLeftRelease$.subscribe(() => {
    void moverService.goByPath(floatingText, circlePathXZ, { ...animationParams, easing: Easing.Linear });
    // TODO setTimout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => {
      void moverService.goByPath(floatingText2, circlePathXZ2, { ...animationParams, easing: Easing.Linear });
    }, 1000);
  });

  return { start: engine.start, space };
}
