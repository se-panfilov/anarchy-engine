import { LightWrapper } from '@Engine/Wrappers/LightWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';
import type { LightParams } from '@Engine/Models/LightParams';

export class LightManager extends AbstractManager<LightWrapper> {
  public create(params: LightParams): LightWrapper {
    const light = new LightWrapper(params);
    this.list$.next([...this.list$.value, new LightWrapper(params)]);
    return light;
  }
}
