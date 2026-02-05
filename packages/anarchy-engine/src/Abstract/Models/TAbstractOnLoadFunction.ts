import type { TWriteable } from '@hellpig/anarchy-shared/Utils';

export type TAbstractOnLoadFunction<T, O = Record<string, any>> = (loaded: TWriteable<T>, options?: O) => T;
