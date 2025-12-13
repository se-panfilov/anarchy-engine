import type { TCameraWrapper } from '@/Engine/Camera';
import type { TControlsRegistry, TOrbitControlsWrapper } from '@/Engine/Controls';
import type { TMilliseconds } from '@/Engine/Math';
import type { TRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TText2dRegistry, TText2dRenderer, TText3dRegistry, TText3dRenderer } from '@/Engine/Text';
import { isDefined } from '@/Engine/Utils';

export function spaceLoop(
  delta: TMilliseconds,
  activeCamera: TCameraWrapper | undefined,
  renderer: TRendererWrapper,
  activeScene: TSceneWrapper,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text2dRenderer: TText2dRenderer,
  text3dRenderer: TText3dRenderer,
  controlsRegistry: TControlsRegistry
): void {
  if (isDefined(activeCamera)) {
    // TODO 10.0.0. RENDERER: move to renderer loop?
    renderer.entity.render(activeScene.entity, activeCamera.entity);
    // TODO 10.0.0. RENDERER: move to text loop? (or renderer loop?)
    // TODO update these text renderers only when there are any text (or maybe only when it's changed)
    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
  }

  // TODO 10.0.0. RENDERER: move to controls loop?
  // just for control's damping
  controlsRegistry.getAll().forEach((controls: TOrbitControlsWrapper): void => {
    if (controls.entity.enableDamping) controls.entity.update(delta);
  });
}
