import { ControlWrapper } from '@Engine/Wrappers/ControlWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';

export class ControlManager extends AbstractManager<ControlWrapper> {
  public create(wrappedCamera: CameraWrapper, wrappedRenderer: RendererWrapper): ControlWrapper {
    const wrapper = new ControlWrapper(wrappedCamera, wrappedRenderer);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
