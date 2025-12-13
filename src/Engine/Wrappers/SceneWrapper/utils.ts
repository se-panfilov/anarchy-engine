import type { ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import { Scene } from 'three';

export interface SceneUtils {
  readonly addCamera: (camera: ReturnType<typeof CameraWrapper>) => Scene;
  readonly addActor: (actor: ReturnType<typeof ActorWrapper>) => Scene;
  readonly addLight: (actor: ReturnType<typeof LightWrapper>) => Scene;
}

export function getSceneUtils(entity: Scene): SceneUtils {
  const addCamera = (camera: ReturnType<typeof CameraWrapper>): Scene => entity.add(camera.entity);
  const addActor = (actor: ReturnType<typeof ActorWrapper>): Scene => entity.add(actor.entity);
  const addLight = (actor: ReturnType<typeof LightWrapper>): Scene => entity.add(actor.entity);

  return { addCamera, addActor, addLight };
}
