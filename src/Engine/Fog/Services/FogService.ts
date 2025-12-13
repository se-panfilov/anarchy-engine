import type { Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TFogConfig, TFogFactory, TFogParams, TFogRegistry, TFogService, TFogWrapper } from '@/Engine/Fog/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>) => scene.setFog(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((fog: TFogWrapper): void => registry.add(fog));

  const create = (params: TFogParams): TFogWrapper => factory.create(params);
  const createFromConfig = (fogs: ReadonlyArray<TFogConfig>): ReadonlyArray<TFogWrapper> => fogs.map((fog: TFogConfig): TFogWrapper => create(factory.configToParams(fog)));

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TFogFactory => factory,
    getRegistry: (): TFogRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
