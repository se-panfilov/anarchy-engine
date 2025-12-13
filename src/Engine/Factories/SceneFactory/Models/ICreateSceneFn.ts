import type { ICreateFN } from '@Engine/Factories';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { ISceneParams } from '@Engine/Models';

export type ICreateSceneFn = ICreateFN<ISceneWrapper, ISceneParams>;
