import type { CreateFN } from '@Engine/Factories';
import type { SceneWrapper } from '@Engine/Wrappers';
import type { ISceneParams } from '@Engine/Models';

export type ICreateSceneFn = CreateFN<ReturnType<typeof SceneWrapper>, ISceneParams>;
