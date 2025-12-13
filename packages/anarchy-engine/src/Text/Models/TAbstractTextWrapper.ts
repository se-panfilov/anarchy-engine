import type { TWithObject3d, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

import type { TTextTransformAgents } from './TTextTransformAgents';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TWithTransformDrive<TTextTransformAgents> & TWithObject3d & TWithTags;
