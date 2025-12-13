import type { ICreateFN } from '@Engine/Factories';
import type { ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
