import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { ISceneConfig, ISceneFactory, ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry } from '@/Engine/Scene';

export function initScenesEntityPipe(scenes: ReadonlyArray<ISceneConfig>): { sceneCreated$: Subscription; sceneFactory: ISceneFactory; sceneRegistry: ISceneRegistry } {
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();
  const sceneCreated$: Subscription = sceneFactory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => sceneRegistry.add(wrapper));
  scenes.forEach((config: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { sceneCreated$, sceneFactory, sceneRegistry };
}
