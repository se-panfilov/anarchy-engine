import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { sceneConfigToParams } from '@hellpig/anarchy-engine/Scene/Adapters';
import type { TSceneFactory, TSceneParams, TSceneWrapper } from '@hellpig/anarchy-engine/Scene/Models';
import { SceneWrapper } from '@hellpig/anarchy-engine/Scene/Wrappers';

export function SceneFactory(): TSceneFactory {
  const factory: TReactiveFactory<TSceneWrapper, TSceneParams> = ReactiveFactory(FactoryType.Scene, SceneWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: sceneConfigToParams });
}
