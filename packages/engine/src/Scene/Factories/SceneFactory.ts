import type { TReactiveFactory } from '@Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Abstract';
import { configToParams } from '@Engine/Scene/Adapters';
import type { TSceneFactory, TSceneParams, TSceneWrapper } from '@Engine/Scene/Models';
import { SceneWrapper } from '@Engine/Scene/Wrappers';

export function SceneFactory(): TSceneFactory {
  const factory: TReactiveFactory<TSceneWrapper, TSceneParams> = ReactiveFactory(FactoryType.Scene, SceneWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
