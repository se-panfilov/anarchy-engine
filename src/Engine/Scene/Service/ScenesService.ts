import { Subject } from 'rxjs';

import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function ScenesService(factory: ISceneFactory, registry: ISceneRegistry): IScenesService {
  const active$: Subject<ISceneWrapper> = new Subject<ISceneWrapper>();

  registry.added$.subscribe((wrapper: ISceneWrapper): void => {
    wrapper.isActive && active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => registry.add(wrapper));

  const create = (params: ISceneParams): ISceneWrapper => factory.create(params);
  const createFromConfig = (scenes: ReadonlyArray<ISceneConfig>): void => scenes.forEach((config: ISceneConfig): ISceneWrapper => factory.create(factory.configToParams(config)));

  function setActive(id: string): void {
    const active: ISceneWrapper = setActiveWrappedEntity(registry, id);
    active$.next(active);
  }
  const findActive = (): ISceneWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    active$.complete();
  });

  return {
    create,
    createFromConfig,
    setActive,
    findActive,
    active$: active$.asObservable(),
    getFactory: (): ISceneFactory => factory,
    getRegistry: (): ISceneRegistry => registry,
    ...destroyable
  };
}
