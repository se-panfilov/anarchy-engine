import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { LightWrapper } from '@Engine/Light/LightWrapper';
import type { WrappedLight } from '@Engine/Light/Models/WrappedLight';
import type { LightParams } from '@Engine/Light/Models/LightParams';
import type { WrappedAmbientLight, WrappedDirectionalLight } from '@Engine/Light/Models/WrappedLight';

interface ILightManager extends Manager {
  readonly createAmbientLight: (params: LightParams) => WrappedAmbientLight;
  readonly createDirectionalLight: (params: LightParams) => WrappedDirectionalLight;
  readonly lights$: BehaviorSubject<WrappedLight | undefined>;
}

export function LightManager(): ILightManager {
  const destroyed$ = new Subject<void>();
  const lights$ = new BehaviorSubject<WrappedLight | undefined>(undefined);

  const createAmbientLight = (params: LightParams): WrappedAmbientLight => createLight(params) as WrappedAmbientLight;
  const createDirectionalLight = (params: LightParams): WrappedDirectionalLight =>
    createLight(params) as WrappedDirectionalLight;

  const createLight = (params: LightParams): WrappedLight => {
    const light = LightWrapper(params);
    lights$.next(LightWrapper(params));
    return light;
  };

  function destroy() {
    lights$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `light_manager_${nanoid()}`, createAmbientLight, createDirectionalLight, lights$, destroy, destroyed$ };
}
