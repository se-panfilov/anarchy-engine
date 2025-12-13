import type { ICreateFN } from '@Engine/Factories';
import type { SceneWrapper } from '@Engine/Wrappers';
import type { ISceneParams } from '@Engine/Models';

export type ICreateSceneFn = ICreateFN<ReturnType<typeof SceneWrapper>, ISceneParams>;
