import type { IMovable4dW } from '@/Engine/Mixins';

export type IVectorWithW = Omit<IMovable4dW, 'setPosition' | 'getPosition'>;
