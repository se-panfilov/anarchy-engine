import type { IWrapper } from '@Engine/Domains/Abstract';
import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { ILightWrapper } from '@Engine/Domains/Light';
import type { IScene, ISceneObject, ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene';
import type { IWriteable } from '@Engine/Utils';
import { Scene } from 'three';

export function SceneWrapper(params: ISceneParams): ISceneWrapper {
  const entity: IWriteable<IScene> = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = params.name;

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity, params);

  function add(obj: ISceneObject): void {
    entity.add(obj);
  }

  function addCamera(camera: Readonly<ICameraWrapper>): void {
    add(camera.entity);
  }

  function addActor(actor: Readonly<IActorWrapper>): void {
    add(actor.entity);
  }

  function addLight(light: Readonly<ILightWrapper>): void {
    add(light.entity);
  }

  return { ...wrapper, add, addActor, addCamera, addLight, entity };
}
