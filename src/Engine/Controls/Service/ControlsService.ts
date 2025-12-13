import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsRegistry, IControlsService, IControlsWrapper } from '@/Engine/Controls/Models';
import type { IDestroyable, IWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

export function ControlService(factory: IControlsFactory, registry: IControlsRegistry, canvas: IAppCanvas): IControlsService {
  const withActive: IWithActiveMixinResult<IControlsWrapper> = withActiveEntityServiceMixin<IControlsWrapper>(registry);
  registry.added$.subscribe((wrapper: IControlsWrapper): void => {
    if (wrapper.isActive) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: IControlsWrapper): void => registry.add(wrapper));

  const create = (params: IControlsParams): IControlsWrapper => factory.create(params);
  const createFromConfig = (controls: ReadonlyArray<IControlsConfig>, camerasRegistry: ICameraRegistry): void => {
    controls.forEach((control: IControlsConfig): IControlsWrapper => {
      const camera: ICameraWrapper | undefined = camerasRegistry.find((camera: ICameraWrapper): boolean => camera.name === control.relatedCameraName);
      if (isNotDefined(camera)) throw new Error(`Cannot find camera for controls (${control.type}) initialization`);
      return create(factory.configToParams(control, { camera, canvas }));
    });
  };

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    withActive.active$.complete();
  });

  return {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive: withActive.findActive,
    active$: withActive.active$.asObservable(),
    getFactory: (): IControlsFactory => factory,
    getRegistry: (): IControlsRegistry => registry,
    ...destroyable
  };
}
