import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraRegistry } from '@/Engine/Camera';
import type { IControlsFactory, IControlsRegistry, IOrbitControlsConfig, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Controls';

export function initControlsEntityPipe(
  cameraRegistry: ICameraRegistry,
  canvas: IAppCanvas,
  controls: ReadonlyArray<IOrbitControlsConfig>
): { controlsCreated$: Subscription; controlsFactory: IControlsFactory; controlsRegistry: IControlsRegistry } {
  const controlsFactory: IControlsFactory = ControlsFactory();
  const controlsRegistry: IControlsRegistry = ControlsRegistry();
  const controlsCreated$: Subscription = controlsFactory.entityCreated$.subscribe((wrapper: IOrbitControlsWrapper): void => controlsRegistry.add(wrapper));
  controls.forEach(
    (control: IOrbitControlsConfig): IOrbitControlsWrapper =>
      controlsFactory.create(controlsFactory.configToParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
  );

  return { controlsCreated$, controlsFactory, controlsRegistry };
}
