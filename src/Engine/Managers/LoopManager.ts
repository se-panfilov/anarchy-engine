import { AbstractManager } from '@Engine/Managers/AbstractManager';
import { LoopWrapper } from '@Engine/Wrappers/LoopWrapper';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { isNotDefined } from '@Engine/Utils';

export class LoopManager extends AbstractManager<LoopWrapper> {
  public create(): LoopWrapper {
    const wrapper = new LoopWrapper();
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }

  // TODO (S.Panfilov) DI?
  public start(renderer: RendererWrapper, scene: SceneWrapper, camera: CameraWrapper): void | never {
    if (isNotDefined(this.current$.value)) throw new Error('Current loop is not set');
    this.current$.value.start(renderer, scene, camera);
  }

  public stop(): void {
    if (isNotDefined(this.current$.value)) throw new Error('Current loop is not set');
    this.current$.value.stop();
  }
}
