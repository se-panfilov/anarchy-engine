import { Clock, Vector3 } from 'three';

import { moveByCircle } from '@/App/Levels/Utils/MoveUtils';
import type { TModel3d, TOrbitControlsWrapper, TSceneWrapper, TSpace } from '@/Engine';
import { isDefined, isNotDefined } from '@/Engine';

export function runBeta(space: TSpace): void {
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  space.start$.next(true);
  const controls: TOrbitControlsWrapper | undefined = space.services.controlsService.findActive() as TOrbitControlsWrapper | undefined;
  if (isDefined(controls)) controls.setTarget(new Vector3(0, 0, 0));

  const foxModelName: string = 'fox_model_3d';

  const foxActor: TModel3d | undefined = space.services.models3dService.getRegistry().findByName(foxModelName);
  if (isNotDefined(foxActor)) throw new Error(`Model "${foxModelName}" is not defined`);
  const sceneW: TSceneWrapper | undefined = space.services.scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error('Scene is not defined');
  sceneW.addModel3d(foxActor);
}
