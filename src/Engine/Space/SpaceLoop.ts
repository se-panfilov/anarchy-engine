import type { ICameraWrapper } from '@/Engine/Camera';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Controls';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer } from '@/Engine/Text';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function spaceLoop(
  delta: number,
  activeCamera: ICameraWrapper,
  renderer: IRendererWrapper,
  activeScene: ISceneWrapper,
  text2dRegistry: IText2dRegistry,
  text3dRegistry: IText3dRegistry,
  text2dRenderer: IText2dRenderer,
  text3dRenderer: IText3dRenderer,
  controlsRegistry: IControlsRegistry
): void {
  if (isDefined(activeCamera)) {
    if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
    renderer.entity.render(activeScene.entity, activeCamera.entity);
    // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
    if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
  }

  // just for control's damping
  controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
    if (controls.entity.enableDamping) controls.entity.update(delta);
  });
}
