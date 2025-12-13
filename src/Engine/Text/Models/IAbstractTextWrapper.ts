import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';
import type { TextTag } from '@/Engine/Text/Constants';

export type IAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
