import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Mixins';

import type { TAnyCameraWrapper } from './TAnyCameraWrapper';
import type { TCameraFactory } from './TCameraFactory';
import type { TCameraRegistry } from './TCameraRegistry';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCommonCameraConfig } from './TCommonCameraConfig';
import type { TCommonCameraParams } from './TCommonCameraParams';

export type TCameraServiceWithCreate = TWithCreateService<TAnyCameraWrapper, TCommonCameraParams>;
export type TCameraServiceWithCreateFromConfig = TWithCreateFromConfigService<TCommonCameraConfig, TAnyCameraWrapper>;
export type TCameraServiceWithFactory = TWithFactoryService<TAnyCameraWrapper, TCommonCameraParams, TCameraServiceDependencies, TCameraFactory>;
export type TCameraServiceWithRegistry = TWithRegistryService<TCameraRegistry>;

export type TCameraService = TSerializableEntitiesService<TCommonCameraConfig> &
  Readonly<{
    startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
  }> &
  TCameraServiceWithCreate &
  TCameraServiceWithCreateFromConfig &
  TWithActiveAccessorsService<TAnyCameraWrapper> &
  TCameraServiceWithFactory &
  TCameraServiceWithRegistry &
  TWithSceneGetterService;
