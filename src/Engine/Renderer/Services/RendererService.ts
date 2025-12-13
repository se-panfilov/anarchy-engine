import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin, withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@/Engine/Mixins';
import { renderLoopEffect } from '@/Engine/Renderer/Loop';
import type {
  TRendererConfig,
  TRendererFactory,
  TRendererRegistry,
  TRendererService,
  TRendererServiceDependencies,
  TRendererServiceWithCreate,
  TRendererServiceWithCreateFromConfig,
  TRendererServiceWithFactory,
  TRendererServiceWithRegistry,
  TRendererWrapper
} from '@/Engine/Renderer/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpaceLoops } from '@/Engine/Space';
import { mergeAll } from '@/Engine/Utils';

export function RendererService(
  factory: TRendererFactory,
  registry: TRendererRegistry,
  { renderLoop }: TSpaceLoops,
  { cameraService, container }: TRendererServiceDependencies,
  scene: TSceneWrapper
): TRendererService {
  const withActive: TWithActiveMixinResult<TRendererWrapper> = withActiveEntityServiceMixin<TRendererWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TRendererWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });

  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TRendererWrapper): void => registry.add(wrapper));

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$, registrySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TRendererServiceWithCreate = withCreateServiceMixin(factory, { container });
  const withCreateFromConfigService: TRendererServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, { cameraService, container });
  const withFactory: TRendererServiceWithFactory = withFactoryService(factory);
  const withRegistry: TRendererServiceWithRegistry = withRegistryService(registry);

  const loopSub$: Subscription = renderLoopEffect(renderLoop, withActive.active$, cameraService, scene);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();

    withActive.active$.complete();
  });

  return mergeAll(abstractService, withCreateService, withCreateFromConfigService, withFactory, withRegistry, withSerializableEntities<TRendererWrapper, TRendererConfig, undefined>(registry), {
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    getActive: withActive.getActive,
    active$: withActive.active$
  });
}
