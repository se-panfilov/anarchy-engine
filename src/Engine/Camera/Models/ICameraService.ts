import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraFactory } from './ICameraFactory';
import type { ICameraParams } from './ICameraParams';
import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
}> &
  TWithCreateService<ICameraWrapper, ICameraParams> &
  TWithCreateFromConfigService<ICameraConfig> &
  TWithActiveAccessorsService<ICameraWrapper> &
  TWithFactoryService<ICameraFactory> &
  TWithRegistryService<ICameraRegistry> &
  TWithSceneGetterService &
  TDestroyable;
