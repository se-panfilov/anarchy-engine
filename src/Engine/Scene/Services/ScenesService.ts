import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneFactory, TSceneParams, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';

export function ScenesService(factory: TSceneFactory, registry: TSceneRegistry): TScenesService {
  const withActive: TWithActiveMixinResult<TSceneWrapper> = withActiveEntityServiceMixin<TSceneWrapper>(registry);

  registry.added$.subscribe((wrapper: TSceneWrapper): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: TSceneWrapper): void => registry.add(wrapper));

  const create = (params: TSceneParams): TSceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<TSceneConfig>): void => scenes.forEach((config: TSceneConfig): TSceneWrapper => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
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
