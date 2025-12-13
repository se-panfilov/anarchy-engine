import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialRegistry = IProtectedRegistry<IAbstractEntityRegistry<IMaterialWrapper>>;
