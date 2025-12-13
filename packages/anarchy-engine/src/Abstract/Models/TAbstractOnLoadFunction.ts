import type { TWriteable } from '@Anarchy/Shared/Utils';

export type TAbstractOnLoadFunction<T, O = Record<string, any>> = (loaded: TWriteable<T>, options?: O) => T;
