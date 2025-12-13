import type { IActive, IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneProps } from '@/Engine/Scene';
import type { IObject3DParams } from '@/Engine/ThreeLib';

export type ISceneParams = ISceneProps & IActive & IObject3DParams & IWithReadonlyTags<string>;
