import type { TAbstractEntityRegistry } from '@/Abstract/Models';
import type { TTextAnyWrapper } from '@/Text/Models';

export type TTextRegistry<T extends TTextAnyWrapper> = TAbstractEntityRegistry<T>;
