import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Anarchy/Engine/Mixins';

import type { TLoadingManagerFactory } from './TLoadingManagerFactory';
import type { TLoadingManagerParams } from './TLoadingManagerParams';
import type { TLoadingManagerRegistry } from './TLoadingManagerRegistry';
import type { TLoadingManagerWrapper } from './TLoadingManagerWrapper';

export type TLoadingManagerServiceWithCreate = TWithCreateService<TLoadingManagerWrapper, TLoadingManagerParams>;
export type TLoadingManagerServiceWithFactory = TWithFactoryService<TLoadingManagerWrapper, TLoadingManagerParams, undefined, TLoadingManagerFactory>;
export type TLoadingManagerServiceWithRegistry = TWithRegistryService<TLoadingManagerRegistry>;

export type TLoadingManagerService = TLoadingManagerServiceWithCreate &
  TLoadingManagerServiceWithFactory &
  TLoadingManagerServiceWithRegistry &
  Readonly<{
    getDefault: () => TLoadingManagerWrapper;
  }>;
