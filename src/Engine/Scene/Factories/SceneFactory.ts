import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Scene/Adapters';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '@/Engine/Scene/Models';
import { SceneWrapper } from '@/Engine/Scene/Wrappers';

const factory: IReactiveFactory<ISceneWrapper, ISceneParams> = { ...ReactiveFactory(FactoryType.Scene, SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, configToParams });
