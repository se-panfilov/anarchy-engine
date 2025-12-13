import type { TMovableZ } from '@/Engine/Mixins';

export type TVectorWithZ = Omit<TMovableZ, 'setPosition' | 'getPosition'>;
