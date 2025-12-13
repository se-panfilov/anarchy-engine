import type { IMovable4dW } from '@/Engine/Mixins';

export type TVectorWithW = Omit<IMovable4dW, 'setPosition' | 'getPosition'>;
