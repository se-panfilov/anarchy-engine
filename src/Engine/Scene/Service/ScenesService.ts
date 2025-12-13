import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function ScenesService(factory: ISceneFactory, registry: ISceneRegistry): IScenesService {
  factory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => registry.add(wrapper));

  const create = (params: ISceneParams): ISceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<ISceneConfig>): void => scenes.forEach((config: ISceneConfig): ISceneWrapper => factory.create(factory.configToParams(config)));

  const setActiveScene = (scene: ISceneWrapper): void => setActiveWrappedEntity(registry, scene.id);
  const findActiveScene = (): ISceneWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    setActiveScene,
    findActiveScene,
    getFactory: (): ISceneFactory => factory,
    getRegistry: (): ISceneRegistry => registry,
    ...destroyable
  };
}
