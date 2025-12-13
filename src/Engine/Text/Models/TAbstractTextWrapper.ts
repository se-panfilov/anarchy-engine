import type { TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TTextTransformAgents } from './TTextTransformAgents';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TWithTransformDrive<TTextTransformAgents> & TWithObject3d & TWithTagsMixin;
