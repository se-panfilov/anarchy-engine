import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { IControlsWrapper } from './IControlsWrapper';

export type TControlsRegistry = TProtectedRegistry<TAbstractEntityRegistry<IControlsWrapper>>;
