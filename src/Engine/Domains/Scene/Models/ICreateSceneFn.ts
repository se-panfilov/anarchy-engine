import type { ISceneParams, ISceneWrapper } from '@Engine/Domains/Scene/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
