import type { TAnyCameraWrapper, TCameraService } from '@Anarchy/Engine/Camera';
import type { TMilliseconds } from '@Anarchy/Engine/Math';
import type { TRendererWrapper } from '@Anarchy/Engine/Renderer/Models';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import type { TRenderLoop } from '@Anarchy/Engine/Space';
import { isNotDefined } from '@Anarchy/Shared/Utils';
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
