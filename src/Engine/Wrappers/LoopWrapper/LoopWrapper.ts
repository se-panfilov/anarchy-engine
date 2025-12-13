import type { CameraWrapper, RendererWrapper, SceneWrapper } from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';
import { getUtils } from './utils';
import type { ILoopWrapper } from './Models';
import type { LoopFn } from './Models/LoopFn';
import type { LoopParams } from '@Engine/Models';

export function LoopWrapper(params: LoopParams): ILoopWrapper {
  const entity: LoopFn = (
    renderer: ReturnType<typeof RendererWrapper>,
    scene: ReturnType<typeof SceneWrapper>,
    camera: ReturnType<typeof CameraWrapper>
  ): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity), ...getUtils(entity), entity };
}
