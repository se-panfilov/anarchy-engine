import type { Subscription } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';
import type { TCameraRegistry, TCameraWrapper } from '@/Engine/Camera';
import { controlsLoopEffect } from '@/Engine/Controls/Loop';
import type { TControlsConfig, TControlsFactory, TControlsParams, TControlsRegistry, TControlsService, TControlsWrapper } from '@/Engine/Controls/Models';
import type { TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSpaceLoops } from '@/Engine/Space';
import { isNotDefined } from '@/Engine/Utils';

export function ControlService(factory: TControlsFactory, registry: TControlsRegistry, { controlsLoop }: TSpaceLoops, canvas: TAppCanvas): TControlsService {
  const abstractService: TAbstractService = AbstractService();
  const withActive: TWithActiveMixinResult<TControlsWrapper> = withActiveEntityServiceMixin<TControlsWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TControlsWrapper>): void => {
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TControlsWrapper): void => registry.add(wrapper));

  const create = (params: TControlsParams): TControlsWrapper => factory.create(params);
  const createFromConfig = (controls: ReadonlyArray<TControlsConfig>, camerasRegistry: TCameraRegistry): void => {
    controls.forEach((control: TControlsConfig): TControlsWrapper => {
      const camera: TCameraWrapper | undefined = camerasRegistry.find((camera: TCameraWrapper): boolean => camera.getName() === control.cameraName);
      if (isNotDefined(camera)) throw new Error(`Cannot find camera for controls (${control.type}) initialization`);
      return create(factory.configToParams(control, { camera, canvas }));
    });
  };

  const loopSub$: Subscription = controlsLoopEffect(controlsLoop, registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    registrySub$.unsubscribe();
    factorySub$.unsubscribe();
    loopSub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();

    withActive.active$.complete();
    withActive.active$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$,
    getFactory: (): TControlsFactory => factory,
    getRegistry: (): TControlsRegistry => registry
  });
}
