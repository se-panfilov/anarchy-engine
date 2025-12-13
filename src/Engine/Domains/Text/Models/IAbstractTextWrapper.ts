import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTags } from '@/Engine/Mixins';

export type IAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & IMovableXYZ & IRotatable & IScalable & IWithObject3d & IWithTags<TextTag>;
