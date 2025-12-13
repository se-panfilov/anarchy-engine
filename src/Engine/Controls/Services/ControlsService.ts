import type { TRegistryPack } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';
import type { TCameraRegistry, TCameraWrapper } from '@/Engine/Camera';
import type { TControlsConfig, TControlsFactory, TControlsParams, TControlsRegistry, TControlsService, TControlsWrapper } from '@/Engine/Controls/Models';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';
import { Subscription } from 'rxjs';

export function ControlService(factory: TControlsFactory, registry: TControlsRegistry, canvas: TAppCanvas): TControlsService {
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
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): TControlsFactory => factory,
    getRegistry: (): TControlsRegistry => registry,
    ...destroyable
  };
}
