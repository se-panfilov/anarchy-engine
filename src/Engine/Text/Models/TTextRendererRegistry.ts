import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TTextAnyRenderer } from './TTextAnyRenderer';

export type TTextRendererRegistry<T extends TTextAnyRenderer> = TProtectedRegistry<TAbstractSimpleRegistry<T>>;
