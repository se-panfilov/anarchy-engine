import type { GizmoOptions } from 'three-viewport-gizmo';
import { ViewportGizmo } from 'three-viewport-gizmo';

import type { TCameraWrapper, TOrbitControlsWrapper, TRendererWrapper, TScreenSizeWatcher, TSpaceLoops, TSpaceServices } from '@/Engine';
import { isNotDefined } from '@/Engine';

export function addGizmo(
  { cameraService, rendererService, controlsService }: Pick<TSpaceServices, 'cameraService' | 'rendererService' | 'controlsService' | 'loopService'>,
  screenSizeWatcher: TScreenSizeWatcher,
  { renderLoop }: TSpaceLoops,
  options?: GizmoOptions
): void {
  const camera: TCameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error('Gizmo: Camera is not defined');

  const controls: TOrbitControlsWrapper | undefined = controlsService.findActive();
  if (isNotDefined(controls)) throw new Error('Gizmo: Controls are not defined');

  const renderer: TRendererWrapper | undefined = rendererService.findActive();
  if (isNotDefined(renderer)) throw new Error('Gizmo: Renderer is not defined');

  const gizmo = new ViewportGizmo(camera.entity, renderer.entity, { placement: options?.placement ?? 'bottom-left' });
  gizmo.attachControls(controls.entity);

  screenSizeWatcher.value$.subscribe((): ViewportGizmo => gizmo.update());

  renderLoop.tick$.subscribe(() => gizmo.render());
}
