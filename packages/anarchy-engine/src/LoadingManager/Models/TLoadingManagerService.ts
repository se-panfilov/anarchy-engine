import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@hellpig/anarchy-engine/Mixins';

import type { TLoadingManagerFactory } from './TLoadingManagerFactory';
import type { TLoadingManagerParams } from './TLoadingManagerParams';
import type { TLoadingManagerRegistry } from './TLoadingManagerRegistry';
import type { TLoadingManagerWrapper } from './TLoadingManagerWrapper';

export type TLoadingManagerServiceWithCreate = TWithCreateService<TLoadingManagerWrapper, TLoadingManagerParams>;
export type TLoadingManagerServiceWithFactory = TWithFactoryService<TLoadingManagerWrapper, TLoadingManagerParams, undefined, TLoadingManagerFactory>;
export type TLoadingManagerServiceWithRegistry = TWithRegistryService<TLoadingManagerRegistry>;

export type TLoadingManagerService = TAbstractService &
  TLoadingManagerServiceWithCreate &
  TLoadingManagerServiceWithFactory &
  TLoadingManagerServiceWithRegistry &
  Readonly<{
    getDefault: () => TLoadingManagerWrapper;
  }>;
