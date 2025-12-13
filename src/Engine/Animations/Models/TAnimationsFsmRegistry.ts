import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TAnimationsFsmWrapper } from './TAnimationsFsmWrapper';

export type TAnimationsFsmRegistry = TProtectedRegistry<TAbstractEntityRegistry<TAnimationsFsmWrapper>>;
