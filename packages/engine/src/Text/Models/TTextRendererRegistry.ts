import type { TAbstractSimpleRegistry } from '@/Abstract/Models';

import type { TTextAnyRenderer } from './TTextAnyRenderer';

export type TTextRendererRegistry<T extends TTextAnyRenderer> = TAbstractSimpleRegistry<T>;
