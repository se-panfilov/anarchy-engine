import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithActiveAccessorsService, IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraFactory } from './ICameraFactory';
import type { ICameraParams } from './ICameraParams';
import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
}> &
  IWithCreateService<ICameraWrapper, ICameraParams> &
  IWithCreateFromConfigService<ICameraConfig> &
  IWithActiveAccessorsService<ICameraWrapper> &
  IWithFactoryService<ICameraFactory> &
  IWithRegistryService<ICameraRegistry> &
  IWithSceneGetterService &
  IDestroyable;
