import type { TMovable2dX } from '@/Engine/Mixins';

export type TVectorWithX = Omit<TMovable2dX, 'setPosition' | 'getPosition' | 'addPosition'>;
