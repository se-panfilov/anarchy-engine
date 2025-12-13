import type { CreateFN } from '@Engine/Factories';
import type { SceneWrapper } from '@Engine/Wrappers';
import type { SceneParams } from '@Engine/Models';

export type ICreateSceneFn = CreateFN<ReturnType<typeof SceneWrapper>, SceneParams>;
