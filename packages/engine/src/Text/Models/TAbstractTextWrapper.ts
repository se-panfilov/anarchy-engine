import type { TWithObject3d, TWithTags } from '@/Mixins';
import type { TWithTransformDrive } from '@/TransformDrive';

import type { TTextTransformAgents } from './TTextTransformAgents';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TWithTransformDrive<TTextTransformAgents> & TWithObject3d & TWithTags;
