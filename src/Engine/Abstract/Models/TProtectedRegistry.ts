import type { TNoSpread } from '@/Engine/Mixins';

export type TProtectedRegistry<T extends { registry: Map<string, any> }> = Readonly<Omit<T, 'registry'>> & TNoSpread;
