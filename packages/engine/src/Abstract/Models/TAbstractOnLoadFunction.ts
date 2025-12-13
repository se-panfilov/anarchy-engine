import type { TWriteable } from '@/Utils';

export type TAbstractOnLoadFunction<T, O = Record<string, any>> = (loaded: TWriteable<T>, options?: O) => T;
