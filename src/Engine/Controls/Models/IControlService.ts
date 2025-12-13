import type { ICameraRegistry } from '@/Engine/Camera';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsFactory } from './IControlsFactory';
import type { IControlsParams } from './IControlsParams';
import type { TControlsRegistry } from './TControlsRegistry';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsService = TWithCreateService<IControlsWrapper, IControlsParams> &
  Omit<TWithCreateFromConfigService<IControlsConfig>, 'createFromConfig'> &
  Readonly<{
    createFromConfig: (controls: ReadonlyArray<IControlsConfig>, camerasRegistry: ICameraRegistry) => void;
  }> &
  TWithActiveAccessorsService<IControlsWrapper> &
  TWithFactoryService<IControlsFactory> &
  TWithRegistryService<TControlsRegistry> &
  TDestroyable;
