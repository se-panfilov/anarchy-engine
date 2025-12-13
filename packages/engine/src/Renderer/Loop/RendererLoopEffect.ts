import type { BehaviorSubject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';

import type { TAnyCameraWrapper, TCameraService } from '@/Camera';
import type { TMilliseconds } from '@/Math';
import type { TRendererWrapper } from '@/Renderer';
import type { TSceneWrapper } from '@/Scene';
import type { TRenderLoop } from '@/Space';
import { isNotDefined } from '@/Utils';

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
