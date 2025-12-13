import type { TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

export type TAbstractTextWrapper = Readonly<{ getElement: () => HTMLElement }> & TWithTransformDrive & TWithObject3d & TWithTagsMixin;
