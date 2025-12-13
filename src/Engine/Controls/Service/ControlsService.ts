import { Subject } from 'rxjs';

import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import type { IControlsConfig, IControlsFactory, IControlsParams, IControlsRegistry, IControlsService, IControlsWrapper } from '@/Engine/Controls/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { findActiveWrappedEntity, isNotDefined, setActiveWrappedEntity } from '@/Engine/Utils';

export function ControlService(factory: IControlsFactory, registry: IControlsRegistry, canvas: IAppCanvas): IControlsService {
  const active$: Subject<IControlsWrapper> = new Subject<IControlsWrapper>();
  registry.added$.subscribe((wrapper: IControlsWrapper): void => {
    if (wrapper.isActive) active$.next(wrapper);
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

  function setActive(id: string): void {
    const active: IControlsWrapper = setActiveWrappedEntity(registry, id);
    active$.next(active);
  }
  const findActive = (): IControlsWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    active$.complete();
  });

  return {
    create,
    createFromConfig,
    setActive,
    findActive,
    active$: active$.asObservable(),
    getFactory: (): IControlsFactory => factory,
    getRegistry: (): IControlsRegistry => registry,
    ...destroyable
  };
}
