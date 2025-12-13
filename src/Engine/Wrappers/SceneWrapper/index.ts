import { Scene } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers';
import { getSceneUtils } from './utils';
import type { SceneParams } from '@Engine/Models/SceneParams';

export type ISceneWrapper = ReturnType<typeof AbstractWrapper<Scene>> & ReturnType<typeof getSceneUtils>;

export function SceneWrapper({ name }: SceneParams): ISceneWrapper {
  const entity: Scene = new Scene();
  entity.name = name;

  return { ...AbstractWrapper(entity), ...getSceneUtils(entity), entity };
}
