import type { ICameraWrapper, IRendererWrapper, ISceneWrapper } from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';
import { getUtils } from './utils';
import type { LoopFn } from './Models/LoopFn';
import type { ILoopParams } from '@Engine/Models';
import type { ILoopWrapper } from './Models';

export function LoopWrapper({ tag }: ILoopParams): ILoopWrapper {
  const entity: LoopFn = (renderer: IRendererWrapper, scene: ISceneWrapper, camera: ICameraWrapper): void => {
    renderer.entity.render(scene.entity, camera.entity);
  };

  return { ...AbstractWrapper(entity), ...getUtils(entity), entity, tag };
}
