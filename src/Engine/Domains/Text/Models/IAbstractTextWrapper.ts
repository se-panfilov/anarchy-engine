import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type IAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
