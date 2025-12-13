import type { TWithObject3d, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TTextTransformAgents } from './TTextTransformAgents';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TWithTransformDrive<TTextTransformAgents> & TWithObject3d & TWithReadonlyTags;
