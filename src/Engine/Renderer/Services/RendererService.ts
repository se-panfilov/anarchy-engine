import type { TAbstractRegistryPack } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TRendererFactory, TRendererParams, TRendererRegistry, TRendererService, TRendererWrapper } from '@/Engine/Renderer/Models';

export function RendererService(factory: TRendererFactory, registry: TRendererRegistry): TRendererService {
  const withActive: TWithActiveMixinResult<TRendererWrapper> = withActiveEntityServiceMixin<TRendererWrapper>(registry);

  registry.added$.subscribe(({ value }: TAbstractRegistryPack<TRendererWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  factory.entityCreated$.subscribe((wrapper: TRendererWrapper): void => registry.add(wrapper));

  const create = (params: TRendererParams): TRendererWrapper => factory.create(params);

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
    getFactory: (): TRendererFactory => factory,
    getRegistry: (): TRendererRegistry => registry,
    ...destroyable
  };
}
