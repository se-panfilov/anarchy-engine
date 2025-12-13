import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Mixins';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraFactory } from './TCameraFactory';
import type { TCameraParams } from './TCameraParams';
import type { TCameraRegistry } from './TCameraRegistry';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCameraWrapper } from './TCameraWrapper';

export type TCameraServiceWithCreate = TWithCreateService<TCameraWrapper, TCameraParams>;
export type TCameraServiceWithCreateFromConfig = TWithCreateFromConfigService<TCameraConfig, TCameraWrapper>;
export type TCameraServiceWithFactory = TWithFactoryService<TCameraWrapper, TCameraParams, TCameraServiceDependencies, TCameraFactory, undefined>;
export type TCameraServiceWithRegistry = TWithRegistryService<TCameraRegistry>;

export type TCameraService = TAbstractService &
  Readonly<{
    startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
  }> &
  TCameraServiceWithCreate &
  TCameraServiceWithCreateFromConfig &
  TWithActiveAccessorsService<TCameraWrapper> &
  TCameraServiceWithFactory &
  TCameraServiceWithRegistry &
  TWithSceneGetterService;
