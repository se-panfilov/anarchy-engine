import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialRegistry = TProtectedRegistry<TAbstractEntityRegistry<IMaterialWrapper>>;
