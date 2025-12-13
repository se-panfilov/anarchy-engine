import type { TCameraWrapper } from '@/Engine/Camera';
import type { TCollisionsLoopService } from '@/Engine/Collisions';
import { CollisionsUpdatePriority } from '@/Engine/Collisions';
import type { TControlsRegistry, TOrbitControlsWrapper } from '@/Engine/Controls';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TMilliseconds } from '@/Engine/Math';
import type { TPhysicsLoopService } from '@/Engine/Physics';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialLoopService } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TText2dRegistry, TText2dRenderer, TText3dRegistry, TText3dRenderer } from '@/Engine/Text';
import { isDefined } from '@/Engine/Utils';

let currentSpatialPriorityCounter: number = SpatialUpdatePriority.ASAP;
let currentCollisionsPriorityCounter: number = CollisionsUpdatePriority.ASAP;

export function spaceLoop(
  delta: TMilliseconds,
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
  spatialLoopService: TSpatialLoopService,
  collisionsLoopService: TCollisionsLoopService
): void {
  // TODO 10.0.0. LOOPS: We need independent loops for physics, kinematic, spatial, collisions, mouse, intersection and transforms. Those loops should be driven by time, not by frame rate
  const isAutoUpdatePhysicalWorld: boolean = physicsLoopService.autoUpdate$.value;
  if (isAutoUpdatePhysicalWorld) physicsLoopService.step();

  if (isDefined(activeCamera)) {
    renderer.entity.render(activeScene.entity, activeCamera.entity);
    // TODO update these text renderers only when there are any text (or maybe only when it's changed)
    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
  }

  if (isAutoUpdatePhysicalWorld) physicsLoopService.tick$.next();

  if (kinematicLoopService.autoUpdate$.value) kinematicLoopService.tick$.next(delta);

  if (spatialLoopService.autoUpdate$.value) {
    spatialLoopService.tick$.next({ delta, priority: currentSpatialPriorityCounter });
    currentSpatialPriorityCounter = currentSpatialPriorityCounter === (SpatialUpdatePriority.IDLE as number) ? SpatialUpdatePriority.ASAP : currentSpatialPriorityCounter - 1;
  }

  if (collisionsLoopService.autoUpdate$.value) {
    collisionsLoopService.tick$.next({ delta, priority: currentCollisionsPriorityCounter });
    currentCollisionsPriorityCounter = currentCollisionsPriorityCounter === (CollisionsUpdatePriority.IDLE as number) ? CollisionsUpdatePriority.ASAP : currentCollisionsPriorityCounter - 1;
  }

  // just for control's damping
  controlsRegistry.getAll().forEach((controls: TOrbitControlsWrapper): void => {
    if (controls.entity.enableDamping) controls.entity.update(delta);
  });
}
