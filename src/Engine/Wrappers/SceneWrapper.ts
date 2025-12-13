import { Scene } from 'three';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

export class SceneWrapper extends AbstractWrapper<Scene> {
  public entity: Scene;

  constructor(name: string) {
    super();
    this.entity = new Scene();
    this.entity.name = name;
  }

  public addCamera(camera: CameraWrapper): void {
    this.entity.add(camera.entity);
  }

  public addActor(actor: ActorWrapper): void {
    this.entity.add(actor.entity);
  }

  public addLight(actor: LightWrapper): void {
    this.entity.add(actor.entity);
  }
}
