import type { TRendererParams } from './TRendererParams';

export type TRendererConfig = Omit<TRendererParams, 'canvas' | 'context'>;
