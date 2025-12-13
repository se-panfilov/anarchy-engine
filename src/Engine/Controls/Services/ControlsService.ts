import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@/Engine/Camera';
import { controlsLoopEffect } from '@/Engine/Controls/Loop';
import type {
  TControlsConfig,
  TControlsFactory,
  TControlsParams,
  TControlsRegistry,
  TControlsService,
  TControlsServiceDependencies,
  TControlsServiceWithFactory,
  TControlsServiceWithRegistry,
  TControlsWrapper,
  TFpsControlsWrapper,
  TOrbitControlsWrapper
} from '@/Engine/Controls/Models';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin, withFactoryService, withRegistryService, withSerializeAllEntities } from '@/Engine/Mixins';
import { withSerializeEntity } from '@/Engine/Mixins/Generics/WithSerializeEntity';
import type { TSpaceCanvas, TSpaceLoops } from '@/Engine/Space';
import { mergeAll } from '@/Engine/Utils';

export function ControlService(
  factory: TControlsFactory,
  registry: TControlsRegistry,
  { controlsLoop }: TSpaceLoops,
  { cameraService }: TControlsServiceDependencies,
  canvas: TSpaceCanvas
): TControlsService {
  const withActive: TWithActiveMixinResult<TControlsWrapper> = withActiveEntityServiceMixin<TControlsWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TControlsWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TControlsWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const cameraRegistry: TAbstractCameraRegistry = cameraService.getRegistry();

  const create = (params: TControlsParams): TControlsWrapper => factory.create(params, undefined);
  const createFromList = (list: ReadonlyArray<TControlsParams>): ReadonlyArray<TControlsWrapper> => list.map(create);
  const createFromConfig = (controls: ReadonlyArray<TControlsConfig>): void => {
    controls.forEach((control: TControlsConfig): TControlsWrapper => {
      const camera: TAnyCameraWrapper = cameraRegistry.get((camera: TAnyCameraWrapper): boolean => camera.getName() === control.cameraName);
      return create(factory.configToParams(control, { camera, canvas }));
    });
  };

  const withFactory: TControlsServiceWithFactory = withFactoryService(factory);
  const withRegistry: TControlsServiceWithRegistry = withRegistryService(registry);

  const loopSub$: Subscription = controlsLoopEffect(controlsLoop, registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    loopSub$.unsubscribe();

    withActive.active$.complete();
  });

  return mergeAll(
    abstractService,
    withFactory,
    withRegistry,
    withSerializeAllEntities<TControlsConfig, TControlsServiceDependencies>(registry, { cameraService }),
    withSerializeEntity<TOrbitControlsWrapper | TFpsControlsWrapper, TControlsServiceDependencies>(),
    {
      create,
      createFromList,
      createFromConfig,
      setActive: withActive.setActive,
      findActive: withActive.findActive,
      getActive: withActive.getActive,
      active$: withActive.active$
    }
  );
}
