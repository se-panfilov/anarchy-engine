import type { IRotatableZ } from '@/Engine/Mixins';

export type IEulerWithZ = Omit<IRotatableZ, 'setRotation' | 'getRotation'>;
