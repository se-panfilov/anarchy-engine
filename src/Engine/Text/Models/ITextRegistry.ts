import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TTextAnyWrapper } from '@/Engine/Text/Models';

export type ITextRegistry<T extends TTextAnyWrapper> = TProtectedRegistry<TAbstractEntityRegistry<T>>;
