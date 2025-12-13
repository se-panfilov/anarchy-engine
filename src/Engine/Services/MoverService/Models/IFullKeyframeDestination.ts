import type { IKeyframeDestination } from './IKeyframeDestination';
import type { IMoveDestination } from './IMoveDestination';

export type IFullKeyframeDestination = Omit<IKeyframeDestination, 'x' | 'y' | 'z'> & Required<IMoveDestination>;
