import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { LoopParams } from '@Engine/Models/LoopParams';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';
import { getUtils } from '@Engine/Wrappers/LoopWrapper/utils';

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
