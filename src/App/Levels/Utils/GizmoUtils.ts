import type { GizmoOptions } from 'three-viewport-gizmo';
import { ViewportGizmo } from 'three-viewport-gizmo';

import type { TAnyCameraWrapper, TContainerDecorator, TControlsWrapper, TOrbitControlsWrapper, TRendererWrapper, TSpaceLoops, TSpaceServices } from '@/Engine';
import { ControlsType, isNotDefined } from '@/Engine';

export function addGizmo(
  { cameraService, rendererService, controlsService }: Pick<TSpaceServices, 'cameraService' | 'rendererService' | 'controlsService' | 'loopService'>,
  container: TContainerDecorator,
  { renderLoop }: TSpaceLoops,
  options?: GizmoOptions
): void | never {
  const camera: TAnyCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Gizmo: Camera is not defined');

  const controls: TControlsWrapper | undefined = controlsService.findActive();
  if (controls?.getType() !== ControlsType.OrbitControls) {
    console.warn(`Gizmo: OrbitControls is required, but the active control is ${controls?.getType()}`);
    return;
  }

  const renderer: TRendererWrapper | undefined = rendererService.findActive();
  if (isNotDefined(renderer)) throw new Error('Gizmo: Renderer is not defined');

  const gizmo = new ViewportGizmo(camera.entity, renderer.entity, { placement: options?.placement ?? 'bottom-left' });
  gizmo.attachControls((controls as TOrbitControlsWrapper).entity);

  container.resize$.subscribe((): ViewportGizmo => gizmo.update());

  renderLoop.tick$.subscribe(() => gizmo.render());
}
