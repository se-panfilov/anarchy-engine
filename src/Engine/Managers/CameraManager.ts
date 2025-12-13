import { CameraParams, CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';

export class CameraManager extends AbstractManager<CameraWrapper> {
  public create(params: CameraParams): CameraWrapper {
    const wrapper = new CameraWrapper(params);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
