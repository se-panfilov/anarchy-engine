import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { ILoopParams, ILoopWrapper, LoopFn } from '@Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import type { ISceneWrapper } from '@Engine/Domains/Scene/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import { getUtils } from './utils';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity, params), ...getUtils(entity), entity, tags: params.tags };
}
