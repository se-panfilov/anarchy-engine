import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

import type { ILoopParams, ILoopWrapper, LoopFn } from '../Models';
import { getUtils } from './utils';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity, params), ...getUtils(entity), entity, tags: params.tags };
}
