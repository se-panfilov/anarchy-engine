import type { TWriteable } from '@/Engine/Utils';

export type TAbstractOnLoadFunction<T, O = Record<string, any>> = (loaded: TWriteable<T>, options?: O) => T;
