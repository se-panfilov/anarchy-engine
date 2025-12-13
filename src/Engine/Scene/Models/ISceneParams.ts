import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneProps } from '@/Engine/Scene';
import type { IObject3DParams } from '@/Engine/ThreeLib';

export type ISceneParams = ISceneProps & IObject3DParams & IWithReadonlyTags<string>;
