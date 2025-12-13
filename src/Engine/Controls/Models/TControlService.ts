import type { TCameraRegistry } from '@/Engine/Camera';
import type { TDestroyable, TNoSpread } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TControlsConfig } from './TControlsConfig';
import type { TControlsFactory } from './TControlsFactory';
import type { TControlsParams } from './TControlsParams';
import type { TControlsRegistry } from './TControlsRegistry';
import type { TControlsWrapper } from './TControlsWrapper';

export type TControlsService = TWithCreateService<TControlsWrapper, TControlsParams> &
  Omit<TWithCreateFromConfigService<TControlsConfig, TControlsWrapper>, 'createFromConfig'> &
  Readonly<{
    createFromConfig: (controls: ReadonlyArray<TControlsConfig>, camerasRegistry: TCameraRegistry) => void;
  }> &
  TWithActiveAccessorsService<TControlsWrapper> &
  TWithFactoryService<TControlsFactory> &
  TWithRegistryService<TControlsRegistry> &
  TNoSpread &
  TDestroyable;
