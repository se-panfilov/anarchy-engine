import type { TMovable3dXYZ, TRotatable, TScaleMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TMovable3dXYZ & TRotatable & TScaleMixin & TWithObject3d & TWithTagsMixin;
