import type { IMovableZ } from '@/Engine/Mixins';

export type IVectorWithZ = Omit<IMovableZ, 'setPosition' | 'getPosition'>;
