import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TTextAnyWrapper } from '@/Engine/Text/Models';

export type TTextRegistry<T extends TTextAnyWrapper> = TProtectedRegistry<TAbstractEntityRegistry<T>>;
