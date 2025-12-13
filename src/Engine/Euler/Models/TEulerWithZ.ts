import type { TRotatableZ } from '@/Engine/Mixins';

export type TEulerWithZ = Omit<TRotatableZ, 'setRotation' | 'getRotation'>;
