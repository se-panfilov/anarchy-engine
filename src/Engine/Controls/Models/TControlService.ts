import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TControlsConfig } from './TControlsConfig';
import type { TControlsFactory } from './TControlsFactory';
import type { TControlsParams } from './TControlsParams';
import type { TControlsRegistry } from './TControlsRegistry';
import type { TControlsWrapper } from './TControlsWrapper';

export type TControlsServiceWithCreate = TWithCreateService<TControlsWrapper, TControlsParams>;
export type TControlsServiceWithCreateFromConfig = Omit<TWithCreateFromConfigService<TControlsConfig, TControlsWrapper>, 'createFromConfig'>;
export type TControlsServiceWithFactory = TWithFactoryService<TControlsWrapper, TControlsParams, undefined, TControlsFactory>;
export type TControlsServiceWithRegistry = TWithRegistryService<TControlsRegistry>;

export type TControlsService = TAbstractService &
  TControlsServiceWithCreate &
  TControlsServiceWithCreateFromConfig &
  Readonly<{
    createFromConfig: (controls: ReadonlyArray<TControlsConfig>) => void;
  }> &
  TWithActiveAccessorsService<TControlsWrapper> &
  TControlsServiceWithFactory &
  TControlsServiceWithRegistry;
