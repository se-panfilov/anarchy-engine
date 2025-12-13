import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
