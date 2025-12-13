import type { TDestroyable, TNoSpread } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraFactory } from './TCameraFactory';
import type { TCameraParams } from './TCameraParams';
import type { TCameraRegistry } from './TCameraRegistry';
import type { TCameraWrapper } from './TCameraWrapper';

export type TCameraService = Readonly<{
  startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
}> &
  TWithCreateService<TCameraWrapper, TCameraParams> &
  TWithCreateFromConfigService<TCameraConfig, TCameraWrapper> &
  TWithActiveAccessorsService<TCameraWrapper> &
  TWithFactoryService<TCameraFactory> &
  TWithRegistryService<TCameraRegistry> &
  TWithSceneGetterService &
  TNoSpread &
  TDestroyable;
