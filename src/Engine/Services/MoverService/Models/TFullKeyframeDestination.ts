import type { TKeyframeDestination } from './TKeyframeDestination';
import type { TMoveDestination } from './TMoveDestination';

export type TFullKeyframeDestination = Omit<TKeyframeDestination, 'x' | 'y' | 'z'> & Required<TMoveDestination>;
