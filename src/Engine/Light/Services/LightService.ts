import type { Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightFactory, TLightParams, TLightRegistry, TLightService } from '@/Engine/Light/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';

export function LightService(factory: TLightFactory, registry: TLightRegistry, scene: TSceneWrapper): TLightService {
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAbstractLightWrapper<TLight>>) => scene.addLight(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAbstractLightWrapper<TLight>): void => registry.add(wrapper));

  const create = (params: TLightParams): TAbstractLightWrapper<TLight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<TAnyLightConfig>): ReadonlyArray<TAbstractLightWrapper<TLight>> =>
    lights.map((config: TAnyLightConfig): TAbstractLightWrapper<TLight> => create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    getFactory: (): TLightFactory => factory,
    getRegistry: (): TLightRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
