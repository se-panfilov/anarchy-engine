import { Scene } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import { getSceneUtils } from './utils';

type ISceneWrapper = ReturnType<typeof AbstractWrapper<Scene>> & ReturnType<typeof getSceneUtils>;

export function SceneWrapper(name: string): ISceneWrapper {
  const entity: Scene = new Scene();
  entity.name = name;

  return { ...AbstractWrapper(entity), ...getSceneUtils(entity), entity };
}
