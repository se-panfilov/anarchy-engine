import { CommonTag } from '@/Engine/Abstract';
import type { ISceneConfig, ISceneFactory, ISceneParams, ISceneRegistry, IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function ScenesService(sceneFactory: ISceneFactory, sceneRegistry: ISceneRegistry): IScenesService {
  sceneFactory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => sceneRegistry.add(wrapper));

  const create = (params: ISceneParams): ISceneWrapper => sceneFactory.create(params);
  const createFromConfig = (config: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] }));

  const setActiveScene = (scene: ISceneWrapper): void => setActiveWrappedEntity(sceneRegistry, scene.id);
  const findActiveScene = (): ISceneWrapper | undefined => findActiveWrappedEntity(sceneRegistry);

  return {
    create,
    createFromConfig,
    setActiveScene,
    findActiveScene
  };
}
