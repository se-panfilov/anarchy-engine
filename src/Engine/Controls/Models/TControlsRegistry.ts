import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TControlsWrapper } from './TControlsWrapper';

export type TControlsRegistry = TProtectedRegistry<TAbstractEntityRegistry<TControlsWrapper>>;
