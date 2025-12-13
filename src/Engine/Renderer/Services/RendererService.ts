import type { IWithActiveMixinResult, TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { IRendererFactory, IRendererParams, IRendererRegistry, IRendererService, IRendererWrapper } from '@/Engine/Renderer/Models';

export function RendererService(factory: IRendererFactory, registry: IRendererRegistry): IRendererService {
  const withActive: IWithActiveMixinResult<IRendererWrapper> = withActiveEntityServiceMixin<IRendererWrapper>(registry);

  registry.added$.subscribe((wrapper: IRendererWrapper): void => {
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => registry.add(wrapper));

  const create = (params: IRendererParams): IRendererWrapper => factory.create(params);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    withActive.active$.complete();
  });

  return {
    create,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): IRendererFactory => factory,
    getRegistry: (): IRendererRegistry => registry,
    ...destroyable
  };
}
