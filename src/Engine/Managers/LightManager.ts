import { LightWrapper } from '@Engine/Wrappers/LightWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { LightParams } from '@Engine/Models/LightParams';

export class LightManager extends AbstractFactory<LightWrapper> {
  public create(params: LightParams): LightWrapper {
    const light = new LightWrapper(params);
    this.list$.next([...this.list$.value, new LightWrapper(params)]);
    return light;
  }
}
