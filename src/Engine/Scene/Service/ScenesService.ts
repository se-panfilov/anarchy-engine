import { CommonTag } from '@/Engine/Abstract';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { SceneTag } from '@/Engine/Scene';

export function ScenesService(sceneFactory: ISceneFactory, sceneRegistry: ISceneRegistry): IScenesService {
  sceneFactory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => sceneRegistry.add(wrapper));

  const create = (params: ISceneParams): ISceneWrapper => sceneFactory.create(params);
  const createFromConfig = (config: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] }));

  function setActiveScene(scene: ISceneWrapper): void {
    sceneRegistry.forEach((wrapper: ISceneWrapper): void => {
      const isTarget: boolean = scene.id === wrapper.id;
      if (isTarget) {
        wrapper.addTag(SceneTag.Active);
        wrapper._setActive(true, true);
      } else {
        if (wrapper.hasTag(SceneTag.Active)) wrapper.removeTag(SceneTag.Active);
        wrapper._setActive(false, true);
      }
    });
  }

  const findActiveScene = (): ISceneWrapper | undefined => sceneRegistry.findByTag(SceneTag.Active);

  return {
    create,
    createFromConfig,
    setActiveScene,
    findActiveScene
  };
}
