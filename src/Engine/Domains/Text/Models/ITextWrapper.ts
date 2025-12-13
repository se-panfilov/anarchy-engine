import type { Object3D } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { ITextAccessors } from '@/Engine/Domains/Text/Models';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ITextWrapper = IWrapper<Object3D> & ITextAccessors & IMovableXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
