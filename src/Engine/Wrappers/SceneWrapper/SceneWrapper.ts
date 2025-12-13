import { AbstractWrapper, ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import type { ISceneParams } from '@Engine/Models/ISceneParams';
import type { ISceneWrapper } from './Models';
import type { IWrapper } from '@Engine/Models';
import { Scene } from 'three';

export function SceneWrapper({ name }: ISceneParams): ISceneWrapper {
  const entity: Scene = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = name;

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity);

  function addCamera(camera: ReturnType<typeof CameraWrapper>): void {
    entity.add(camera.entity);
  }

  function addActor(actor: ReturnType<typeof ActorWrapper>): void {
    entity.add(actor.entity);
  }

  function addLight(actor: ReturnType<typeof LightWrapper>): void {
    entity.add(actor.entity);
  }

  return { ...wrapper, addActor, addCamera, addLight, entity };
}
