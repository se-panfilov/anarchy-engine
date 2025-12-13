import type { IMovable2dX } from '@/Engine/Mixins';

export type TVectorWithX = Omit<IMovable2dX, 'setPosition' | 'getPosition'>;
