import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Scene/Adapters';
import type { TSceneFactory, TSceneParams, TSceneWrapper } from '@/Engine/Scene/Models';
import { SceneWrapper } from '@/Engine/Scene/Wrappers';

const factory: TReactiveFactory<TSceneWrapper, TSceneParams> = ReactiveFactory(FactoryType.Scene, SceneWrapper);
export const SceneFactory = (): TSceneFactory => ({ ...factory, configToParams });
