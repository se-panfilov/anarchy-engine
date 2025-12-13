import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

export type IAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & IMovable3dXYZ & IRotatable & IScalable & IWithObject3d & IWithTagsMixin;
