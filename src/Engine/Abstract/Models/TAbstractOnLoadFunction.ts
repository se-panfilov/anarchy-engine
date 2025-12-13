import type { TWriteable } from '@/Engine/Utils';

export type TAbstractOnLoadFunction<T> = (loaded: TWriteable<T>, options?: Record<string, any>) => T;
