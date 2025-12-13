import type { TRotatableY } from '@/Engine/Mixins';

export type TEulerWithY = Omit<TRotatableY, 'setRotation' | 'getRotation'>;
