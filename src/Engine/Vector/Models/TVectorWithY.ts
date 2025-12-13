import type { IMovableY } from '@/Engine/Mixins';

export type TVectorWithY = Omit<IMovableY, 'setPosition' | 'getPosition'>;
