import type { TMessages } from './TMessages';

export type TLocalesMapping<L extends string> = Record<L, () => Promise<TMessages>>;
