import type { GizmoOptions } from 'three-viewport-gizmo';
import { ViewportGizmo } from 'three-viewport-gizmo';

import type { TAnyCameraWrapper, TAnyControlsWrapper, TContainerDecorator, TOrbitControlsWrapper, TRendererWrapper, TSpaceLoops, TSpaceServices } from '@/Engine';
import { ControlsType } from '@/Engine';

export function addGizmo(
  { cameraService, rendererService, controlsService }: Pick<TSpaceServices, 'cameraService' | 'rendererService' | 'controlsService' | 'loopService'>,
  container: TContainerDecorator,
  { renderLoop }: TSpaceLoops,
  options?: GizmoOptions
): void | never {
  const camera: TAnyCameraWrapper = cameraService.getActive();
  const controls: TAnyControlsWrapper = controlsService.getActive();
  if (controls?.getType() !== ControlsType.OrbitControls) {
    console.warn(`Gizmo: OrbitControls is required, but the active control is ${controls?.getType()}`);
    return;
  }

  const renderer: TRendererWrapper = rendererService.getActive();
  const gizmo = new ViewportGizmo(camera.entity, renderer.entity, { placement: options?.placement ?? 'bottom-left' });
  gizmo.attachControls((controls as TOrbitControlsWrapper).entity);

  container.resize$.subscribe((): ViewportGizmo => gizmo.update());

  renderLoop.tick$.subscribe(() => gizmo.render());
}
