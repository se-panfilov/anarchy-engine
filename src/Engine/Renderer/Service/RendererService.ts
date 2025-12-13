import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IRendererFactory, IRendererParams, IRendererRegistry, IRendererService, IRendererWrapper } from '@/Engine/Renderer/Models';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function RendererService(factory: IRendererFactory, registry: IRendererRegistry): IRendererService {
  factory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => registry.add(wrapper));

  const create = (params: IRendererParams): IRendererWrapper => factory.create(params);

  const setActive = (rendererId: string): void => setActiveWrappedEntity(registry, rendererId);
  const findActive = (): IRendererWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    setActive,
    findActive,
    getFactory: (): IRendererFactory => factory,
    getRegistry: (): IRendererRegistry => registry,
    ...destroyable
  };
}
