import '@Public/resources/fonts.css';

import type { TModel3d, TModels3dRegistry, TSceneWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { spaceService, TextType, TransformAgent } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { Euler, Vector3 } from 'three';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchResourceLoading } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  watchResourceLoading(space);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { textService, models3dService, scenesService } = space.services;
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const planeModel3d: TModel3d = models3dRegistry.getByName('surface_model');
  const sphereModel3d: TModel3d = models3dRegistry.getByName('sphere_model');

  sceneW.addModel3d(planeModel3d);
  sceneW.addModel3d(sphereModel3d);

  textService.create({
    name: 'text_3d_1',
    type: TextType.Text3d,
    text: '3D text (RubikDoodleTriangles)',
    position: new Vector3(-4, 2, 0),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#000000',
      fontSize: '0.2rem',
      backgroundColor: '#FF0000',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    }
  });

  textService.create({
    name: 'text_3d_2',
    type: TextType.Text3dTexture,
    text: '3D Texture Text (can be hidden by objects in the scene)',
    position: new Vector3(8, 10, 2),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#000000',
      fontSize: '16rem',
      backgroundColor: '#FFFFFF',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    }
  });

  textService.create({
    name: 'text_3d_3',
    type: TextType.Text3d,
    text: 'RubikScribble',
    position: new Vector3(-5, 12, 6),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#FF0000',
      fontSize: '0.2rem',
      fontFamily: '"RubikScribble", sans-serif'
    }
  });

  textService.create({
    name: 'floating_text_1',
    type: TextType.Text3d,
    text: 'LongCang',
    position: new Vector3(-10, 8, -8),
    rotation: new Euler(-1.57, 0, 0),
    agent: TransformAgent.Connected,
    cssProps: {
      color: '#FF0000',
      fontSize: '0.2rem',
      fontFamily: '"LongCang", sans-serif'
    }
  });

  textService.create({
    name: 'floating_text_2',
    type: TextType.Text3d,
    text: 'VarelaRound',
    position: new Vector3(-15, 6, -14),
    rotation: new Euler(-1.57, 0, 0),
    agent: TransformAgent.Connected,
    cssProps: {
      color: '#FF0000',
      fontSize: '0.2rem',
      fontFamily: '"VarelaRound", sans-serif'
    }
  });

  space.start$.next(true);
}
