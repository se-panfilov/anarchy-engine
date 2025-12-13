import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { IRendererFactory, IRendererParams, IRendererRegistry, IRendererService, IRendererWrapper } from '@/Engine/Renderer/Models';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function RendererService(factory: IRendererFactory, registry: IRendererRegistry): IRendererService {
  factory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => registry.add(wrapper));

  const create = (params: IRendererParams): IRendererWrapper => factory.create(params);

  const setActiveRenderer = (rendererId: string): void => setActiveWrappedEntity(registry, rendererId);
  const findActiveRenderer = (): IRendererWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    setActiveRenderer,
    findActiveRenderer,
    getFactory: (): IRendererFactory => factory,
    getRegistry: (): IRendererRegistry => registry,
    ...destroyable
  };
}
