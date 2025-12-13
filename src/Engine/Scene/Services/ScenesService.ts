import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneFactory, TSceneParams, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';

export function ScenesService(factory: TSceneFactory, registry: TSceneRegistry): TScenesService {
  const withActive: TWithActiveMixinResult<TSceneWrapper> = withActiveEntityServiceMixin<TSceneWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TSceneWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });

  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TSceneWrapper): void => registry.add(wrapper));

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TSceneParams): TSceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<TSceneConfig>): ReadonlyArray<TSceneWrapper> => scenes.map((config: TSceneConfig): TSceneWrapper => create(factory.configToParams(config)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    withActive.active$.complete();
    withActive.active$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$,
    getFactory: (): TSceneFactory => factory,
    getRegistry: (): TSceneRegistry => registry
  });
}
