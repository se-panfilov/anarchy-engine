import type { IScene, ISceneObject, IWrapper } from '@Engine/Models';
import type { ISceneParams } from '@Engine/Models/ISceneParams';
import type { Writeable } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, ILightWrapper } from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';
import { Scene } from 'three';

import type { ISceneWrapper } from './Models';

export function SceneWrapper({ name }: ISceneParams): ISceneWrapper {
  const entity: Writeable<IScene> = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = name;

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity);

  function add(obj: ISceneObject): void {
    entity.add(obj);
  }

  function addCamera(camera: ICameraWrapper): void {
    add(camera.entity);
  }

  function addActor(actor: IActorWrapper): void {
    add(actor.entity);
  }

  function addLight(light: ILightWrapper): void {
    add(light.entity);
  }

  return { ...wrapper, add, addActor, addCamera, addLight, entity };
}
