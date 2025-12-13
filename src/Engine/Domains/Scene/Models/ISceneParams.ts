import type { ISceneProps, SceneTag } from '@/Engine/Domains/Scene';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type ISceneParams = ISceneProps & IObject3DPropConfig & IWithReadonlyTags<SceneTag>;
