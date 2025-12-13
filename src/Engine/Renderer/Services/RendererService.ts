import type { TRegistryPack } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TRendererFactory, TRendererParams, TRendererRegistry, TRendererService, TRendererWrapper } from '@/Engine/Renderer/Models';
import { Subscription } from 'rxjs';

export function RendererService(factory: TRendererFactory, registry: TRendererRegistry): TRendererService {
  const withActive: TWithActiveMixinResult<TRendererWrapper> = withActiveEntityServiceMixin<TRendererWrapper>(registry);

  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TRendererWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TRendererWrapper): void => registry.add(wrapper));

  const create = (params: TRendererParams): TRendererWrapper => factory.create(params);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();
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
