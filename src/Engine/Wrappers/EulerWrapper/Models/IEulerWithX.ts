import type { IRotatableX } from '@/Engine/Mixins';

export type IEulerWithX = Omit<IRotatableX, 'setRotation' | 'getRotation'>;
