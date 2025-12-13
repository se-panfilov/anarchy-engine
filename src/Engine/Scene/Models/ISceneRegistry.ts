import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TSceneWrapper } from './TSceneWrapper';

export type ISceneRegistry = TProtectedRegistry<TAbstractEntityRegistry<TSceneWrapper>>;
