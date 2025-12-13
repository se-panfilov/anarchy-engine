import type { IAbstractAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IMaterialWrapperAsync } from './IMaterialWrapperAsync';

export type IMaterialAsyncRegistry = IProtectedRegistry<IAbstractAsyncRegistry<IMaterialWrapperAsync>>;
