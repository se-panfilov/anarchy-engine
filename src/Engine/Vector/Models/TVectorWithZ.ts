import type { IMovableZ } from '@/Engine/Mixins';

export type TVectorWithZ = Omit<IMovableZ, 'setPosition' | 'getPosition'>;
