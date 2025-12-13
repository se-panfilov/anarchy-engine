import type { IDestroyable, IWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';

export function ScenesService(factory: ISceneFactory, registry: ISceneRegistry): IScenesService {
  const withActive: IWithActiveMixinResult<ISceneWrapper> = withActiveEntityServiceMixin<ISceneWrapper>(registry);

  registry.added$.subscribe((wrapper: ISceneWrapper): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => registry.add(wrapper));

  const create = (params: ISceneParams): ISceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<ISceneConfig>): void => scenes.forEach((config: ISceneConfig): ISceneWrapper => factory.create(factory.configToParams(config)));

  const destroyable: IDestroyable = destroyableMixin();
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
