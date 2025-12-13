import type { BehaviorSubject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';

import type { TCameraService, TCameraWrapper } from '@/Engine/Camera';
import type { TMilliseconds } from '@/Engine/Math';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TRenderLoop } from '@/Engine/Space';
import { isNotDefined } from '@/Engine/Utils';

export function renderLoopEffect(loop: TRenderLoop, activeRenderer$: BehaviorSubject<TRendererWrapper | undefined>, cameraService: TCameraService, scene: TSceneWrapper): Subscription {
  return loop.tick$
    .pipe(withLatestFrom(activeRenderer$, cameraService.active$))
    .subscribe(([, rendererW, activeCameraW]: [TMilliseconds, TRendererWrapper | undefined, TCameraWrapper | undefined]): void => {
      if (isNotDefined(activeCameraW)) return;
      if (isNotDefined(rendererW)) throw new Error('RenderLoopEffect: Cannot find an active renderer');
      rendererW.entity.render(scene.entity, activeCameraW.entity);
    });
}
