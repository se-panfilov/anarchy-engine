import '@public/Showcase/fonts.css';

import { Euler, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { addGizmo } from '@/App/Levels/Utils';
import type { TAnimationParams, TMeters, TModel3d, TModels3dRegistry, TMoverService, TRadians, TSceneWrapper, TSpace, TSpaceConfig, TTextAnyWrapper } from '@/Engine';
import { asRecord, createCirclePathXZ, defaultMoverServiceConfig, Easing, generateAnglesForCircle, isNotDefined, meters, radians, spaceService, TextType, TransformAgent } from '@/Engine';
import { MoverService } from '@/Engine/Services/MoverService/MoverService';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { textService, mouseService, models3dService, scenesService } = space.services;
  const { transformLoop } = space.loops;

  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();

  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d | undefined = models3dRegistry.findByName('surface_model');
  if (isNotDefined(planeModel3d)) throw new Error('Plane model is not defined');

  sceneW.addModel3d(planeModel3d);

  textService.create({
    name: 'text_3d_1',
    type: TextType.Text2d,
    text: '2D text (RubikDoodleTriangles)',
    position: new Vector3(-4, 8, 0),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#000000',
      fontSize: '4rem',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    }
  });

  textService.create({
    name: 'text_3d_2',
    type: TextType.Text2d,
    text: 'RubikScribble',
    position: new Vector3(-5, 12, 6),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#FF0000',
      fontSize: '4rem',
      fontFamily: '"RubikScribble", sans-serif'
    }
  });

  const floatingText: TTextAnyWrapper = textService.create({
    name: 'text_3d_3',
    type: TextType.Text2d,
    text: 'LongCang',
    position: new Vector3(-10, 8, -8),
    rotation: new Euler(-1.57, 0, 0),
    agent: TransformAgent.Connected,
    cssProps: {
      color: '#FF0000',
      fontSize: '4rem',
      fontFamily: '"LongCang", sans-serif'
    }
  });

  const floatingText2: TTextAnyWrapper = textService.create({
    name: 'text_3d_4',
    type: TextType.Text2d,
    text: 'VarelaRound',
    position: new Vector3(-15, 6, -14),
    rotation: new Euler(-1.57, 0, 0),
    agent: TransformAgent.Connected,
    cssProps: {
      color: '#FF0000',
      fontSize: '4rem',
      fontFamily: '"VarelaRound", sans-serif'
    }
  });

  const numberOfPoints: number = 160;
  const numberOfCircles: number = 1;
  const startAngle: TRadians = radians(degToRad(100));
  const radius: TMeters = meters(15);
  const circlePathXZ: ReadonlyArray<Vector3> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle), radius, new Vector3(0, 0, 0));
  const circlePathXZ2: ReadonlyArray<Vector3> = createCirclePathXZ(generateAnglesForCircle(numberOfPoints, numberOfCircles, startAngle - 20), (radius + meters(3)) as TMeters, new Vector3(-4, 0, 0));

  const animationParams: TAnimationParams = {
    duration: 2000,
    direction: 'normal',
    loop: true
  };

  const moverService: TMoverService = MoverService(transformLoop, defaultMoverServiceConfig);

  mouseService.clickLeftRelease$.subscribe((): void => {
    void moverService.goByPath(floatingText, circlePathXZ, { ...animationParams, easing: Easing.Linear });
    // TODO setTimeout/setInterval is not a good idea (cause the game might be "on pause", e.g. when tab is not active)
    setTimeout(() => {
      void moverService.goByPath(floatingText2, circlePathXZ2, { ...animationParams, easing: Easing.Linear });
    }, 1000);
  });

  space.start$.next(true);
}
