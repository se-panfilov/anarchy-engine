import type { TAbstractService, TRegistryPack } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@Engine/Camera';
import { controlsLoopEffect } from '@Engine/Controls/Loop';
import type {
  TAnyControlsWrapper,
  TControlsConfig,
  TControlsFactory,
  TControlsParams,
  TControlsRegistry,
  TControlsService,
  TControlsServiceDependencies,
  TControlsServiceWithFactory,
  TControlsServiceWithRegistry
} from '@Engine/Controls/Models';
import type { TDisposable, TWithActiveMixinResult } from '@Engine/Mixins';
import { withActiveEntityServiceMixin, withFactoryService, withRegistryService, withSerializableEntities } from '@Engine/Mixins';
import type { TSpaceCanvas, TSpaceLoops } from '@Engine/Space';
import { mergeAll } from '@Engine/Utils';
import type { Subscription } from 'rxjs';

export function ControlService(
  factory: TControlsFactory,
  registry: TControlsRegistry,
  { controlsLoop }: TSpaceLoops,
  { cameraService }: TControlsServiceDependencies,
  canvas: TSpaceCanvas
): TControlsService {
  const withActive: TWithActiveMixinResult<TAnyControlsWrapper> = withActiveEntityServiceMixin<TAnyControlsWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAnyControlsWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAnyControlsWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const cameraRegistry: TAbstractCameraRegistry = cameraService.getRegistry();

  const create = (params: TControlsParams): TAnyControlsWrapper => factory.create(params, undefined);
  const createFromList = (list: ReadonlyArray<TControlsParams>): ReadonlyArray<TAnyControlsWrapper> => list.map(create);
  const createFromConfig = (controls: ReadonlyArray<TControlsConfig>): void => {
    controls.forEach((control: TControlsConfig): TAnyControlsWrapper => {
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

  return mergeAll(abstractService, withFactory, withRegistry, withSerializableEntities<TAnyControlsWrapper, TControlsConfig, TControlsServiceDependencies>(registry, { cameraService }), {
    create,
    createFromList,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    getActive: withActive.getActive,
    active$: withActive.active$
  });
}
