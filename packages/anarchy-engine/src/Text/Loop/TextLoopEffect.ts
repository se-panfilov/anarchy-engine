import type { TAnyCameraWrapper, TCameraService } from '@Anarchy/Engine/Camera';
import type { TMilliseconds } from '@Anarchy/Engine/Math';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import type { TText2dRegistry, TText2dRenderer, TText3dRegistry, TText3dRenderer, TTextLoop } from '@Anarchy/Engine/Text/Models';
import { isNotDefined } from '@Shared/Utils';
import type { BehaviorSubject, Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';

export function textLoopEffect(
  loop: TTextLoop,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text2dRenderer$: BehaviorSubject<TText2dRenderer | undefined>,
  text3dRenderer$: BehaviorSubject<TText3dRenderer | undefined>,
  scene: TSceneWrapper,
  cameraService: TCameraService
): Subscription | never {
  return loop.tick$
    .pipe(withLatestFrom(cameraService.active$, text2dRenderer$, text3dRenderer$))
    .subscribe(([, activeCameraW, text2dRenderer, text3dRenderer]: [TMilliseconds, TAnyCameraWrapper | undefined, TText2dRenderer | undefined, TText3dRenderer | undefined]): void | never => {
      if (isNotDefined(activeCameraW)) return;

      if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(scene.entity, activeCameraW.entity);
      if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(scene.entity, activeCameraW.entity);
    });
}
