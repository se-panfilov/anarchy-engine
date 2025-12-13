import type { ICameraRegistry } from '@/Engine/Camera';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithActiveAccessorsService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsFactory } from './IControlsFactory';
import type { IControlsParams } from './IControlsParams';
import type { IControlsRegistry } from './IControlsRegistry';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsService = IWithCreateService<IControlsWrapper, IControlsParams> &
  Readonly<{
    createFromConfig: (controls: ReadonlyArray<IControlsConfig>, camerasRegistry: ICameraRegistry) => void;
  }> &
  IWithActiveAccessorsService<IControlsWrapper> &
  IWithFactoryService<IControlsFactory> &
  IWithRegistryService<IControlsRegistry> &
  IDestroyable;
