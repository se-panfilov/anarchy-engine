import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry } from '@/Engine/Camera';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsRegistry, IControlsService, IControlsWrapper } from '@/Engine/Controls/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findActiveWrappedEntity, isNotDefined, setActiveWrappedEntity } from '@/Engine/Utils';

export function ControlService(factory: IControlsFactory, registry: IControlsRegistry, cameraRegistry: ICameraRegistry, canvas: IAppCanvas): IControlsService {
  factory.entityCreated$.subscribe((wrapper: IControlsWrapper): void => registry.add(wrapper));

  const create = (params: IControlsParams): IControlsWrapper => factory.create(params);
  const createFromConfig = (controls: ReadonlyArray<IControlsConfig>): void => {
    controls.forEach((control: IControlsConfig): IControlsWrapper => {
      if (isNotDefined(cameraRegistry)) throw new Error(`Cannot find camera registry for controls (${control.type}) initialization`);
      return factory.create(factory.configToParams(control, { cameraRegistry, canvas }));
    });
  };

  const setActiveControls = (controlsId: string): void => setActiveWrappedEntity(registry, controlsId);
  const findActiveControls = (): IControlsWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    setActiveControls,
    findActiveControls,
    ...destroyable
  };
}
