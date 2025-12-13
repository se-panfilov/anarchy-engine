import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TAnyAudioWrapper } from './TAnyAudioWrapper';

export type TAudioRegistry = TProtectedRegistry<TAbstractEntityRegistry<TAnyAudioWrapper>>;
