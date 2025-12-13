import { Scene } from 'three';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

export class SceneWrapper extends AbstractWrapper<Scene> {
  public entity: Scene;

  constructor() {
    super();
    this.entity = new Scene();
  }

  public addCamera(camera: CameraWrapper): void {
    this.entity.add(camera.entity);
  }

  public addActor(actor: ActorWrapper): void {
    this.entity.add(actor.entity);
  }
}
