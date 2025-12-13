import type { TScalable, TMovable3dXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

export type IAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TMovable3dXYZ & TRotatable & TScalable & TWithObject3d & TWithTagsMixin;
