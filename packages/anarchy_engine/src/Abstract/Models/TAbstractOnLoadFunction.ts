import type { TWriteable } from '@Shared/Utils';

export type TAbstractOnLoadFunction<T, O = Record<string, any>> = (loaded: TWriteable<T>, options?: O) => T;
