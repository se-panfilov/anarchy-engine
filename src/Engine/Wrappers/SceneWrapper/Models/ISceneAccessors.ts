import type { ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';

export interface ISceneAccessors {
  readonly addCamera: (camera: ReturnType<typeof CameraWrapper>) => Scene;
  readonly addActor: (actor: ReturnType<typeof ActorWrapper>) => Scene;
  readonly addLight: (actor: ReturnType<typeof LightWrapper>) => Scene;
}
