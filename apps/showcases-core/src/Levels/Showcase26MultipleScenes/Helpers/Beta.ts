import type { TModel3d, TOrbitControlsWrapper, TSceneWrapper, TSpace } from '@Anarchy/Engine';
import { TextType } from '@Anarchy/Engine';
import { isDefined } from '@Anarchy/Shared/Utils';
import { Clock, Euler, Vector3 } from 'three';

import { watchActiveRendererReady } from '@/Utils';
import { moveByCircle } from '@/Utils/MoveUtils';

import { addParticles } from './Utils';

export function runBeta(space: TSpace): void {
  watchActiveRendererReady(space);
  addModel3d(space);
  addText(space);
  addParticles(space);
}

function addModel3d(space: TSpace): void {
  const { actorService, controlsService, models3dService, scenesService } = space.services;
  const { transformLoop } = space.loops;

  moveByCircle('box_actor', actorService, transformLoop, new Clock());
  space.start$.next(true);
  const controls: TOrbitControlsWrapper = controlsService.getActive() as TOrbitControlsWrapper;
  if (isDefined(controls)) controls.setTarget(new Vector3(0, 0, 0));

  const foxModelName: string = 'fox_model_3d';

  const foxActor: TModel3d = models3dService.getRegistry().getByName(foxModelName);
  const sceneW: TSceneWrapper = scenesService.getActive();
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
