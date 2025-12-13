import type { TRegistryPack } from '@/Engine/Abstract';
import type { TFogConfig, TFogFactory, TFogParams, TFogRegistry, TFogService, TFogWrapper } from '@/Engine/Fog/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function FogService(factory: TFogFactory, registry: TFogRegistry, scene: TSceneWrapper): TFogService {
  registry.added$.subscribe(({ value }: TRegistryPack<TFogWrapper>) => scene.setFog(value));
  factory.entityCreated$.subscribe((fog: TFogWrapper): void => registry.add(fog));

  const create = (params: TFogParams): TFogWrapper => factory.create(params);
  const createFromConfig = (fogs: ReadonlyArray<TFogConfig>): ReadonlyArray<TFogWrapper> => fogs.map((fog: TFogConfig): TFogWrapper => create(factory.configToParams(fog)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
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
