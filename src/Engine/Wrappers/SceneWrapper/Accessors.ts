import type { ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import type { ISceneAccessors } from './Models';
import { Scene } from 'three';

export function getAccessors(entity: Scene): ISceneAccessors {
  const addCamera = (camera: ReturnType<typeof CameraWrapper>): Scene => entity.add(camera.entity);
  const addActor = (actor: ReturnType<typeof ActorWrapper>): Scene => entity.add(actor.entity);
  const addLight = (actor: ReturnType<typeof LightWrapper>): Scene => entity.add(actor.entity);

  return { addCamera, addActor, addLight };
}
