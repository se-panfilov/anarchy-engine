import type { IMovableX } from '@/Engine/Mixins';

export type IVectorWithX = Omit<IMovableX, 'setPosition' | 'getPosition'>;
