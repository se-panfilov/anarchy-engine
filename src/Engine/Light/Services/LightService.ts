import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightFactory, TLightParams, TLightRegistry, TLightService } from '@/Engine/Light/Models';
import type { TDisposable } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function LightService(factory: TLightFactory, registry: TLightRegistry, scene: TSceneWrapper): TLightService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAbstractLightWrapper<TLight>>) => scene.addLight(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAbstractLightWrapper<TLight>): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TLightParams): TAbstractLightWrapper<TLight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<TAnyLightConfig>): ReadonlyArray<TAbstractLightWrapper<TLight>> =>
    lights.map((config: TAnyLightConfig): TAbstractLightWrapper<TLight> => create(factory.configToParams(config)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TLightFactory => factory,
    getRegistry: (): TLightRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
