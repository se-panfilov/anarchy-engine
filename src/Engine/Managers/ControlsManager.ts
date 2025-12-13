import { ControlsWrapper } from '@Engine/Wrappers/ControlsWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';

export class ControlsManager extends AbstractFactory<ControlsWrapper> {
  public create(wrappedCamera: CameraWrapper, wrappedRenderer: RendererWrapper): ControlsWrapper {
    const wrapper: ControlsWrapper = new ControlsWrapper(wrappedCamera, wrappedRenderer);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
