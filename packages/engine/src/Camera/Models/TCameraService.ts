import type { TSerializableEntitiesService } from '@/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Mixins';

import type { TAnyCameraConfig } from './TAnyCameraConfig';
import type { TAnyCameraParams } from './TAnyCameraParams';
import type { TAnyCameraWrapper } from './TAnyCameraWrapper';
import type { TCameraFactory } from './TCameraFactory';
import type { TCameraRegistry } from './TCameraRegistry';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';

export type TCameraServiceWithCreate = TWithCreateService<TAnyCameraWrapper, TAnyCameraParams>;
export type TCameraServiceWithCreateFromConfig = TWithCreateFromConfigService<TAnyCameraConfig, TAnyCameraWrapper>;
export type TCameraServiceWithFactory = TWithFactoryService<TAnyCameraWrapper, TAnyCameraParams, TCameraServiceDependencies, TCameraFactory>;
export type TCameraServiceWithRegistry = TWithRegistryService<TCameraRegistry>;

export type TCameraService = TSerializableEntitiesService<TAnyCameraWrapper, TAnyCameraConfig> &
  Readonly<{
    startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
  }> &
  TCameraServiceWithCreate &
  TCameraServiceWithCreateFromConfig &
  TWithActiveAccessorsService<TAnyCameraWrapper> &
  TCameraServiceWithFactory &
  TCameraServiceWithRegistry &
  TWithSceneGetterService;
