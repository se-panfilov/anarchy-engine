import type { TMovableXYZ, TRotatable, TScaleMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TMovableXYZ & TRotatable & TScaleMixin & TWithObject3d & TWithTagsMixin;
