import type { TAbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Models';
import type { TTextAnyWrapper } from '@hellpig/anarchy-engine/Text/Models';

export type TTextRegistry<T extends TTextAnyWrapper> = TAbstractEntityRegistry<T>;
