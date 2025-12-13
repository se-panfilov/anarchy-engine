import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { ITextAccessors } from '@/Engine/Domains/Text/Models';
import type { IObject3D } from '@/Engine/Domains/ThreeLib';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type ITextWrapper = IWrapper<IObject3D> & ITextAccessors & IMovableXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
