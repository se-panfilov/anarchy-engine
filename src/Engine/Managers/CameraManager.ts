import { CameraParams, CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';

export class CameraManager extends AbstractFactory<CameraWrapper> {
  // TODO (S.Panfilov) deviceWatcher should be injected in CameraWrapper, not here
  public create(params: CameraParams, deviceWatcher: DeviceWatcher): CameraWrapper {
    const wrapper = new CameraWrapper(params, deviceWatcher);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
