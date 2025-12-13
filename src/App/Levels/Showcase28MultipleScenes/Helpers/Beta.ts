import { Clock, Euler, Vector3 } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TModel3d, TOrbitControlsWrapper, TSceneWrapper, TSpace } from '@/Engine';
import { isDefined, isNotDefined, TextType } from '@/Engine';

import { addParticles } from './Utils';

export function runBeta(space: TSpace): void {
  addModel3d(space);
  addText(space);
  addParticles(space);
}

function addModel3d(space: TSpace): void {
  const { actorService, controlsService, models3dService, scenesService } = space.services;
  const { transformLoop } = space.loops;

  moveByCircle('box_actor', actorService, transformLoop, new Clock());
  space.start$.next(true);
  const controls: TOrbitControlsWrapper | undefined = controlsService.findActive() as TOrbitControlsWrapper | undefined;
  if (isDefined(controls)) controls.setTarget(new Vector3(0, 0, 0));

  const foxModelName: string = 'fox_model_3d';

  const foxActor: TModel3d | undefined = models3dService.getRegistry().findByName(foxModelName);
  if (isNotDefined(foxActor)) throw new Error(`Model "${foxModelName}" is not defined`);
  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');
  sceneW.addModel3d(foxActor);
}

function addText(space: TSpace): void {
  space.services.textService.create({
    name: 'text_3d_2',
    type: TextType.Text3dTexture,
    text: '3D Texture Text',
    position: new Vector3(-8, 10, 2),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#000000',
      fontSize: '16rem',
      backgroundColor: '#FFFFFF',
      fontFamily: '"RubikDoodleTriangles", sans-serif'
    }
  });
}
