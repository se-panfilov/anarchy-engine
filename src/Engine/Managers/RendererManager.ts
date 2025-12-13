import { AbstractManager } from '@Engine/Managers/AbstractManager';
import { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';

export class RendererManager extends AbstractManager<RendererWrapper> {
  public create(canvas: HTMLElement, deviceWatcher: DeviceWatcher): RendererWrapper {
    const wrappedRenderer = new RendererWrapper(canvas, deviceWatcher);
    this.list$.next([...this.list$.value, wrappedRenderer]);

    return wrappedRenderer;
  }
}
