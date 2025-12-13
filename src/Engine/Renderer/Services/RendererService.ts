import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import { renderLoopEffect } from '@/Engine/Renderer/Loop';
import type {
  TRendererFactory,
  TRendererRegistry,
  TRendererService,
  TRendererServiceDependencies,
  TRendererServiceWithCreate,
  TRendererServiceWithFactory,
  TRendererServiceWithRegistry,
  TRendererWrapper
} from '@/Engine/Renderer/Models';
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

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$, registrySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TRendererServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TRendererServiceWithFactory = withFactoryService(factory);
  const withRegistry: TRendererServiceWithRegistry = withRegistryService(registry);

  const loopSub$: Subscription = renderLoopEffect(renderLoop, withActive.active$, cameraService, scene);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();

    withActive.active$.complete();
    withActive.active$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry, {
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$
  });
}
