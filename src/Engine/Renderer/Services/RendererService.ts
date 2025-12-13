import type { Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import { renderLoopEffect } from '@/Engine/Renderer/Loop';
import type { TRendererFactory, TRendererParams, TRendererRegistry, TRendererService, TRendererServiceDependencies, TRendererWrapper } from '@/Engine/Renderer/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpaceLoops } from '@/Engine/Space';

export function RendererService(
  factory: TRendererFactory,
  registry: TRendererRegistry,
  { renderLoop }: TSpaceLoops,
  { cameraService }: TRendererServiceDependencies,
  scene: TSceneWrapper
): TRendererService {
  const withActive: TWithActiveMixinResult<TRendererWrapper> = withActiveEntityServiceMixin<TRendererWrapper>(registry);

  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TRendererWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TRendererWrapper): void => registry.add(wrapper));

  const create = (params: TRendererParams): TRendererWrapper => factory.create(params);

  const loopSub$: Subscription = renderLoopEffect(renderLoop, withActive.active$, cameraService, scene);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();
    loopSub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();

    withActive.active$.complete();
    withActive.active$.unsubscribe();
  });

  return {
    create,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$,
    getFactory: (): TRendererFactory => factory,
    getRegistry: (): TRendererRegistry => registry,
    ...destroyable
  };
}
