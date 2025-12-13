import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene/Models';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
