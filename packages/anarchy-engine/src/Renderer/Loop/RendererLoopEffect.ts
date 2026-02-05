import type { TAnyCameraWrapper, TCameraService } from '@hellpig/anarchy-engine/Camera';
import type { TMilliseconds } from '@hellpig/anarchy-engine/Math';
import type { TRendererWrapper } from '@hellpig/anarchy-engine/Renderer/Models';
import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';
import type { TRenderLoop } from '@hellpig/anarchy-engine/Space';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import type { BehaviorSubject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';

export function renderLoopEffect(loop: TRenderLoop, activeRenderer$: BehaviorSubject<TRendererWrapper | undefined>, cameraService: TCameraService, scene: TSceneWrapper): Subscription {
  return loop.tick$
    .pipe(withLatestFrom(activeRenderer$, cameraService.active$))
    .subscribe(([, rendererW, activeCameraW]: [TMilliseconds, TRendererWrapper | undefined, TAnyCameraWrapper | undefined]): void => {
      if (isNotDefined(activeCameraW)) return;
      if (isNotDefined(rendererW)) {
        loop.stop();
        throw new Error('RenderLoopEffect: Cannot find an active renderer');
      }
      rendererW.entity.render(scene.entity, activeCameraW.entity);
    });
}
