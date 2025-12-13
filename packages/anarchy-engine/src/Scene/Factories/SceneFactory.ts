import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Scene/Adapters';
import type { TSceneFactory, TSceneParams, TSceneWrapper } from '@Anarchy/Engine/Scene/Models';
import { SceneWrapper } from '@Anarchy/Engine/Scene/Wrappers';

export function SceneFactory(): TSceneFactory {
  const factory: TReactiveFactory<TSceneWrapper, TSceneParams> = ReactiveFactory(FactoryType.Scene, SceneWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
