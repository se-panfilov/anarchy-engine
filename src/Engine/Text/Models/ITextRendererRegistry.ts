import type { IAbstractSimpleRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';

import type { ITextAnyRenderer } from './ITextAnyRenderer';

export type ITextRendererRegistry<T extends ITextAnyRenderer> = IProtectedRegistry<IAbstractSimpleRegistry<T>>;
