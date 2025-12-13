import type { IRotatableY } from '@/Engine/Mixins';

export type IEulerWithY = Omit<IRotatableY, 'setRotation' | 'getRotation'>;
