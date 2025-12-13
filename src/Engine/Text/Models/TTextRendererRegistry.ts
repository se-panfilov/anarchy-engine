import type { TAbstractSimpleRegistry } from '@/Engine/Abstract/Models';

import type { TTextAnyRenderer } from './TTextAnyRenderer';

export type TTextRendererRegistry<T extends TTextAnyRenderer> = TAbstractSimpleRegistry<T>;
