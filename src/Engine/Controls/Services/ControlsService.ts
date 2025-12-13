import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAbstractCameraRegistry, TCameraWrapper } from '@/Engine/Camera';
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
  TControlsWrapper
} from '@/Engine/Controls/Models';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin, withFactoryService, withRegistryService, withSerializeAllEntities } from '@/Engine/Mixins';
import type { TSpaceCanvas, TSpaceLoops } from '@/Engine/Space';
import { isNotDefined } from '@/Engine/Utils';

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
      const camera: TCameraWrapper | undefined = cameraRegistry.find((camera: TCameraWrapper): boolean => camera.getName() === control.cameraName);
      if (isNotDefined(camera)) throw new Error(`Cannot find camera for controls (${control.type}) initialization`);
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

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, withSerializeAllEntities<TControlsConfig, TControlsServiceDependencies>(registry, { cameraService }), {
    create,
    createFromList,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$
  });
}
