import type { ICreateFN } from '@Engine/Factories';
import type { ISceneWrapper, ISceneParams } from '@Engine/Domains/Scene/Models';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
