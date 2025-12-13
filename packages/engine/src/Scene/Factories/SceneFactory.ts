import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Scene/Adapters';
import type { TSceneFactory, TSceneParams, TSceneWrapper } from '@/Scene/Models';
import { SceneWrapper } from '@/Scene/Wrappers';

export function SceneFactory(): TSceneFactory {
  const factory: TReactiveFactory<TSceneWrapper, TSceneParams> = ReactiveFactory(FactoryType.Scene, SceneWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
