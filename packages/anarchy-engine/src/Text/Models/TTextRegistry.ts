import type { TAbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Models';
import type { TTextAnyWrapper } from '@Anarchy/Engine/Text/Models';

export type TTextRegistry<T extends TTextAnyWrapper> = TAbstractEntityRegistry<T>;
