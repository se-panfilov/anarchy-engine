import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Scene/Adapter';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '@/Engine/Scene/Models';
import { SceneWrapper } from '@/Engine/Scene/Wrapper';

const factory: IReactiveFactory<ISceneWrapper, ISceneParams> = { ...ReactiveFactory(FactoryType.Scene, SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, configToParams });
