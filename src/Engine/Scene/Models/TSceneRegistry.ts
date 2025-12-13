import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TSceneWrapper } from './TSceneWrapper';

export type TSceneRegistry = TProtectedRegistry<TAbstractEntityRegistry<TSceneWrapper>>;
