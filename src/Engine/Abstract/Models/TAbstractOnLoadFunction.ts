import type { TWriteable } from '@/Engine/Utils';

export type TAbstractOnLoadFunction<T> = (r: TWriteable<T>, params?: Record<string, any>) => T;
