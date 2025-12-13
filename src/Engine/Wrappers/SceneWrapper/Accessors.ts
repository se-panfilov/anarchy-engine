import type { ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import type { IAccessors } from './Models';
import { Scene } from 'three';

export function getAccessors(entity: Scene): IAccessors {
  const addCamera = (camera: ReturnType<typeof CameraWrapper>): Scene => entity.add(camera.entity);
  const addActor = (actor: ReturnType<typeof ActorWrapper>): Scene => entity.add(actor.entity);
  const addLight = (actor: ReturnType<typeof LightWrapper>): Scene => entity.add(actor.entity);

  return { addCamera, addActor, addLight };
}
