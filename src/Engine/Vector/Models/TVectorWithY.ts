import type { TMovableY } from '@/Engine/Mixins';

export type TVectorWithY = Omit<TMovableY, 'setPosition' | 'getPosition'>;
