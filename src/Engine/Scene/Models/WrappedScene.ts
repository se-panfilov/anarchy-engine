import type { Entity } from '@/Engine/Models';
import { Scene } from 'three';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { WrappedActor } from '@Engine/Actor/Models/WrappedActor';

export interface WrappedScene extends Entity {
  readonly scene: Scene;
  readonly addCamera: (camera: WrappedCamera) => void;
  readonly addActor: (camera: WrappedActor) => void;
}
