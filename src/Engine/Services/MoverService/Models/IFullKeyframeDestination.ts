import type { IKeyframeDestination } from './IKeyframeDestination';
import type { IMoveDestination } from './IMoveDestination';

export type IFullKeyframeDestination = ReadonlyArray<Omit<IKeyframeDestination, 'x' | 'y' | 'z'> & Required<IMoveDestination>>;
