import type { TAbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract/Models';

import type { TTextAnyRenderer } from './TTextAnyRenderer';

export type TTextRendererRegistry<T extends TTextAnyRenderer> = TAbstractSimpleRegistry<T>;
