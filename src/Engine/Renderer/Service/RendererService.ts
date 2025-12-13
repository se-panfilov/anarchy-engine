import { Subject } from 'rxjs';

import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IRendererFactory, IRendererParams, IRendererRegistry, IRendererService, IRendererWrapper } from '@/Engine/Renderer/Models';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function RendererService(factory: IRendererFactory, registry: IRendererRegistry): IRendererService {
  const active$: Subject<IRendererWrapper> = new Subject<IRendererWrapper>();

  registry.added$.subscribe((wrapper: IRendererWrapper): void => {
    if (wrapper.isActive()) active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => registry.add(wrapper));

  const create = (params: IRendererParams): IRendererWrapper => factory.create(params);

  function setActive(id: string): void {
    const active: IRendererWrapper = setActiveWrappedEntity(registry, id);
    active$.next(active);
  }
  const findActive = (): IRendererWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    active$.complete();
  });

  return {
    create,
    setActive,
    findActive,
    active$: active$.asObservable(),
    getFactory: (): IRendererFactory => factory,
    getRegistry: (): IRendererRegistry => registry,
    ...destroyable
  };
}
