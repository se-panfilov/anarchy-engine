import type { ICameraWrapper } from '@/Engine/Camera';
import type { TControlsRegistry, TOrbitControlsWrapper } from '@/Engine/Controls';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer } from '@/Engine/Text';
import { isDefined } from '@/Engine/Utils';

export function spaceLoop(
  delta: number,
  activeCamera: ICameraWrapper | undefined,
  renderer: IRendererWrapper,
  activeScene: TSceneWrapper,
  text2dRegistry: IText2dRegistry,
  text3dRegistry: IText3dRegistry,
  text2dRenderer: IText2dRenderer,
  text3dRenderer: IText3dRenderer,
  controlsRegistry: TControlsRegistry
): void {
  if (isDefined(activeCamera)) {
    renderer.entity.render(activeScene.entity, activeCamera.entity);
    // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
  }

  // just for control's damping
  controlsRegistry.getAll().forEach((controls: TOrbitControlsWrapper): void => {
    if (controls.entity.enableDamping) controls.entity.update(delta);
  });
}
