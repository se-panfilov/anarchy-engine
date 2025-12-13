import type { TAbstractEntityRegistry } from '@Engine/Abstract/Models';
import type { TTextAnyWrapper } from '@Engine/Text/Models';

export type TTextRegistry<T extends TTextAnyWrapper> = TAbstractEntityRegistry<T>;
