import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { ITextAnyWrapper } from '@/Engine/Text/Models';

export type ITextRegistry<T extends ITextAnyWrapper> = TProtectedRegistry<TAbstractEntityRegistry<T>>;
