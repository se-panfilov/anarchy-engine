import '@public/Showcase/fonts.css';

import { Euler, Vector3 } from 'three';

import { addGizmo } from '@/Levels/Utils';
import type { TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig } from '@Engine';
import { asRecord, isNotDefined, spaceService, TextType, TransformAgent } from '@Engine';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig]));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { textService, models3dService, scenesService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');

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

  textService.create({
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

  textService.create({
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

  space.start$.next(true);
}
