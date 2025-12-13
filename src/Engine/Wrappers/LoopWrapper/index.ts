import { AbstractWrapper } from '@Engine/Wrappers';
import type { CameraWrapper, RendererWrapper, SceneWrapper } from '@Engine/Wrappers';
import { getUtils } from './utils';
import type { LoopFn } from './Models/LoopFn';
import type { LoopParams } from '@Engine/Models';

type ILoopWrapper = ReturnType<typeof AbstractWrapper<LoopFn>> & ReturnType<typeof getUtils>;

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
