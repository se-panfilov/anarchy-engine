import type { TRotatableX } from '@/Engine/Mixins';

export type TEulerWithX = Omit<TRotatableX, 'setRotation' | 'getRotation'>;
