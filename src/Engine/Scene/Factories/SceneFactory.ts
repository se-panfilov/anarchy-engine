import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Scene/Adapters';
import type { ISceneFactory, ISceneParams, TSceneWrapper } from '@/Engine/Scene/Models';
import { SceneWrapper } from '@/Engine/Scene/Wrappers';

const factory: TReactiveFactory<TSceneWrapper, ISceneParams> = { ...ReactiveFactory(FactoryType.Scene, SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, configToParams });
