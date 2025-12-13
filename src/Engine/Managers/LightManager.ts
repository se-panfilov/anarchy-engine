import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { LightWrapper } from '@Engine/Light/LightWrapper';
import type { WrappedAmbientLight, WrappedDirectionalLight, WrappedLight } from '@Engine/Light/Models/WrappedLight';
import type { LightParams } from '@Engine/Light/Models/LightParams';

interface ILightManager extends Manager<WrappedLight> {
  readonly createAmbientLight: (params: LightParams) => WrappedAmbientLight;
  readonly createDirectionalLight: (params: LightParams) => WrappedDirectionalLight;
}

export function LightManager(): ILightManager {
  const current$ = new BehaviorSubject<WrappedLight | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedLight>>([]);
  const destroyed$ = new Subject<void>();

  const createAmbientLight = (params: LightParams): WrappedAmbientLight => create(params) as WrappedAmbientLight;
  const createDirectionalLight = (params: LightParams): WrappedDirectionalLight =>
    create(params) as WrappedDirectionalLight;

  function create(params: LightParams): WrappedLight {
    const light = LightWrapper(params);
    list$.next([...list$.value, LightWrapper(params)]);
    return light;
  }

  const setCurrent = (light: WrappedLight): void => current$.next(light);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return {
    id: `light_manager_${nanoid()}`,
    create,
    createAmbientLight,
    createDirectionalLight,
    setCurrent,
    current$,
    list$,
    destroy,
    destroyed$
  };
}
