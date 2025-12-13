import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsRegistry, IControlsService, IControlsWrapper } from '@/Engine/Controls/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findActiveWrappedEntity, isNotDefined, setActiveWrappedEntity } from '@/Engine/Utils';

export function ControlService(factory: IControlsFactory, registry: IControlsRegistry, canvas: IAppCanvas): IControlsService {
  factory.entityCreated$.subscribe((wrapper: IControlsWrapper): void => registry.add(wrapper));

  const create = (params: IControlsParams): IControlsWrapper => factory.create(params);
  const createFromConfig = (controls: ReadonlyArray<IControlsConfig>, camerasRegistry: ICameraRegistry): void => {
    controls.forEach((control: IControlsConfig): IControlsWrapper => {
      const camera: ICameraWrapper | undefined = camerasRegistry.find((camera: ICameraWrapper): boolean => camera.name === control.relatedCameraName);
      if (isNotDefined(camera)) throw new Error(`Cannot find camera for controls (${control.type}) initialization`);
      return create(factory.configToParams(control, { camera, canvas }));
    });
  };

  const setActive = (controlsId: string): void => setActiveWrappedEntity(registry, controlsId);
  const findActive = (): IControlsWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    setActive,
    findActive,
    getFactory: (): IControlsFactory => factory,
    getRegistry: (): IControlsRegistry => registry,
    ...destroyable
  };
}
