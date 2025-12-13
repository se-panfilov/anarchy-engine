import type { TCameraWrapper } from '@/Engine/Camera';
import type { TControlsRegistry, TOrbitControlsWrapper } from '@/Engine/Controls';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TPhysicsLoopService } from '@/Engine/Physics';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialLoopService } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TText2dRegistry, TText2dRenderer, TText3dRegistry, TText3dRenderer } from '@/Engine/Text';
import { isDefined } from '@/Engine/Utils';

let currentPriorityCounter: number = SpatialUpdatePriority.ASAP;

export function spaceLoop(
  delta: number,
  activeCamera: TCameraWrapper | undefined,
  renderer: TRendererWrapper,
  activeScene: TSceneWrapper,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text2dRenderer: TText2dRenderer,
  text3dRenderer: TText3dRenderer,
  controlsRegistry: TControlsRegistry,
  physicsLoopService: TPhysicsLoopService,
  kinematicLoopService: TKinematicLoopService,
  spatialLoopService: TSpatialLoopService
): void {
  const isAutoUpdatePhysicalWorld: boolean = physicsLoopService.isAutoUpdate();
  if (isAutoUpdatePhysicalWorld) physicsLoopService.step();

  if (isDefined(activeCamera)) {
    renderer.entity.render(activeScene.entity, activeCamera.entity);
    // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
  }

  if (isAutoUpdatePhysicalWorld) physicsLoopService.tick$.next();

  if (kinematicLoopService.isAutoUpdate()) kinematicLoopService.tick$.next(delta);

  if (spatialLoopService.isAutoUpdate()) {
    spatialLoopService.tick$.next({ delta, priority: currentPriorityCounter });
    currentPriorityCounter = currentPriorityCounter === (SpatialUpdatePriority.IDLE as number) ? SpatialUpdatePriority.ASAP : currentPriorityCounter - 1;
  }

  // just for control's damping
  controlsRegistry.getAll().forEach((controls: TOrbitControlsWrapper): void => {
    if (controls.entity.enableDamping) controls.entity.update(delta);
  });
}
