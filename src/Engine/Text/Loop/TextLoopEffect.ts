import type { Subscription } from 'rxjs';
import { withLatestFrom } from 'rxjs';

import type { TCameraService, TCameraWrapper } from '@/Engine/Camera';
import type { TMilliseconds } from '@/Engine/Math';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TText2dRegistry, TText2dRenderer, TText2dRendererRegistry, TText3dRegistry, TText3dRenderer, TText3dRendererRegistry, TTextLoop } from '@/Engine/Text/Models';
import { isNotDefined } from '@/Engine/Utils';

export function textLoopEffect(
  loop: TTextLoop,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text2dRendererRegistry: TText2dRendererRegistry,
  text3dRendererRegistry: TText3dRendererRegistry,
  scene: TSceneWrapper,
  cameraService: TCameraService
): Subscription | never {
  // TODO 9.2.0 ACTIVE: is a fast code, we should have active renreders (and get actives in every tick)
  const text2dRenderer: TText2dRenderer | undefined = text2dRendererRegistry.getAll()[0];
  const text3dRenderer: TText3dRenderer | undefined = text3dRendererRegistry.getAll()[0];

  return loop.tick$.pipe(withLatestFrom(cameraService.active$)).subscribe(([, activeCameraW]: [TMilliseconds, TCameraWrapper | undefined]): void | never => {
    if (isNotDefined(activeCameraW)) return;

    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(scene.entity, activeCameraW.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(scene.entity, activeCameraW.entity);
  });
}
