import type { ISceneProps, SceneTag } from '@/Engine/Domains/Scene';
import type { IObject3DPropParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type ISceneParams = ISceneProps & IObject3DPropParams & IWithReadonlyTags<SceneTag>;
