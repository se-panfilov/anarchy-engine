import type { IMovableW } from '@/Engine/Mixins';

export type IVectorWithW = Omit<IMovableW, 'setPosition' | 'getPosition'>;
