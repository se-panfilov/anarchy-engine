import type { IMovableY } from '@/Engine/Mixins';

export type IVectorWithY = Omit<IMovableY, 'setPosition' | 'getPosition'>;
