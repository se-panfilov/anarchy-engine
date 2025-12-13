import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { ITextAnyRenderer } from './ITextAnyRenderer';

export type ITextRendererRegistry<T extends ITextAnyRenderer> = TProtectedRegistry<TAbstractSimpleRegistry<T>>;
