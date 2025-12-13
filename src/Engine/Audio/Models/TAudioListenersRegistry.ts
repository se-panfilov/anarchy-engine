import type { AudioListener } from 'three';

import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

export type TAudioListenersRegistry = TProtectedRegistry<TAbstractSimpleRegistry<AudioListener>>;
