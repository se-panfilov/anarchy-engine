import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightFactory, TLightParams, TLightRegistry, TLightService } from '@/Engine/Light/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function LightService(factory: TLightFactory, registry: TLightRegistry, scene: TSceneWrapper): TLightService {
  const abstractService: TAbstractService = AbstractService();
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAbstractLightWrapper<TLight>>) => scene.addLight(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAbstractLightWrapper<TLight>): void => registry.add(wrapper));

  const create = (params: TLightParams): TAbstractLightWrapper<TLight> => factory.create(params);
  const createFromConfig = (lights: ReadonlyArray<TAnyLightConfig>): ReadonlyArray<TAbstractLightWrapper<TLight>> =>
    lights.map((config: TAnyLightConfig): TAbstractLightWrapper<TLight> => create(factory.configToParams(config)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TLightFactory => factory,
    getRegistry: (): TLightRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
