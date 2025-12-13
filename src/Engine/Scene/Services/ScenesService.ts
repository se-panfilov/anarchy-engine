import type { TDestroyable, IWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';

export function ScenesService(factory: ISceneFactory, registry: ISceneRegistry): TScenesService {
  const withActive: IWithActiveMixinResult<TSceneWrapper> = withActiveEntityServiceMixin<TSceneWrapper>(registry);

  registry.added$.subscribe((wrapper: TSceneWrapper): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: TSceneWrapper): void => registry.add(wrapper));

  const create = (params: ISceneParams): TSceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<ISceneConfig>): void => scenes.forEach((config: ISceneConfig): TSceneWrapper => factory.create(factory.configToParams(config)));

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
    getFactory: (): ISceneFactory => factory,
    getRegistry: (): ISceneRegistry => registry,
    ...destroyable
  };
}
