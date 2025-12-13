import type { TMovable4dW } from '@/Engine/Mixins';

export type TVectorWithW = Omit<TMovable4dW, 'setPosition' | 'getPosition' | 'addPosition'>;
