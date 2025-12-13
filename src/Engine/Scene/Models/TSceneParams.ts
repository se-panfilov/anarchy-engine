import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TSceneProps } from '@/Engine/Scene';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type TSceneParams = TSceneProps & TObject3DParams & TWithReadonlyTags;
