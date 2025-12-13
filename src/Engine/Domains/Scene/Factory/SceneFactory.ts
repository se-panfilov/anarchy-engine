import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { configToParams } from '@/Engine/Domains/Scene/Adapter';
import type { ISceneFactory, ISceneParams, ISceneWrapper } from '@/Engine/Domains/Scene/Models';
import { SceneWrapper } from '@/Engine/Domains/Scene/Wrapper';

const factory: IReactiveFactory<ISceneWrapper, ISceneParams> = { ...ReactiveFactory(FactoryType.Scene, SceneWrapper) };
export const SceneFactory = (): ISceneFactory => ({ ...factory, configToParams });
