import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TFogConfig, TFogFactory, TFogParams, TFogRegistry, TFogService, TFogWrapper } from '@/Engine/Fog/Models';
import type { TDisposable } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>) => scene.setFog(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fog: TFogWrapper): void => registry.add(fog));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TFogParams): TFogWrapper => factory.create(params);
  const createFromConfig = (fogs: ReadonlyArray<TFogConfig>): ReadonlyArray<TFogWrapper> => fogs.map((fog: TFogConfig): TFogWrapper => create(factory.configToParams(fog)));

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TFogFactory => factory,
    getRegistry: (): TFogRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
