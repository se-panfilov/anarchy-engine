import type { ILoopParams } from '@Engine/Models';
import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';

import type { ILoopWrapper } from './Models';
import type { LoopFn } from './Models/LoopFn';
import { getUtils } from './utils';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity, params), ...getUtils(entity), entity, tags: params.tags };
}
