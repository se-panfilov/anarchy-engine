import type { IMovable2dX } from '@/Engine/Mixins';

export type IVectorWithX = Omit<IMovable2dX, 'setPosition' | 'getPosition'>;
