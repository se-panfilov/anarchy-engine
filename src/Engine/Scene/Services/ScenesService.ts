import type { TRegistryPack } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneFactory, TSceneParams, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';

export function ScenesService(factory: TSceneFactory, registry: TSceneRegistry): TScenesService {
  const withActive: TWithActiveMixinResult<TSceneWrapper> = withActiveEntityServiceMixin<TSceneWrapper>(registry);

  registry.added$.subscribe(({ value }: TRegistryPack<TSceneWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  factory.entityCreated$.subscribe((wrapper: TSceneWrapper): void => registry.add(wrapper));

  const create = (params: TSceneParams): TSceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<TSceneConfig>): ReadonlyArray<TSceneWrapper> => scenes.map((config: TSceneConfig): TSceneWrapper => create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    factory.destroy$.next();
    registry.destroy$.next();
    withActive.active$.complete();
  });

  return {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): TSceneFactory => factory,
    getRegistry: (): TSceneRegistry => registry,
    ...destroyable
  };
}
