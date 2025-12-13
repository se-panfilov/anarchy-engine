import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneProps } from '@/Engine/Scene';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type ISceneParams = ISceneProps & TObject3DParams & TWithReadonlyTags;
