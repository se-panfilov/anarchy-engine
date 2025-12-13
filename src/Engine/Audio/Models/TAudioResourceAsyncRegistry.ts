import type { Howl } from 'howler';

import type { TAbstractResourceAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TAudioResourceAsyncRegistry = TProtectedRegistry<TAbstractResourceAsyncRegistry<Howl>>;
