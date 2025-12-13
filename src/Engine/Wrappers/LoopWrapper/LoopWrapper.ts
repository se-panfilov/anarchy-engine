import type { ILoopParams } from '@Engine/Models';
import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';

import type { ILoopWrapper } from './Models';
import type { LoopFn } from './Models/LoopFn';
import { getUtils } from './utils';

export function LoopWrapper({ tag }: ILoopParams): ILoopWrapper {
  const entity: LoopFn = (renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity), ...getUtils(entity), entity, tag };
}
