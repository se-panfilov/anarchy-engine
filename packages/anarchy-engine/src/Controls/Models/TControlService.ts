import type { TSerializableEntitiesService } from '@Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Engine/Mixins';

import type { TAnyControlsWrapper } from './TAnyControlsWrapper';
import type { TControlsConfig } from './TControlsConfig';
import type { TControlsFactory } from './TControlsFactory';
import type { TControlsParams } from './TControlsParams';
import type { TControlsRegistry } from './TControlsRegistry';

export type TControlsServiceWithCreate = TWithCreateService<TAnyControlsWrapper, TControlsParams>;
export type TControlsServiceWithCreateFromConfig = Omit<TWithCreateFromConfigService<TControlsConfig, TAnyControlsWrapper>, 'createFromConfig'>;
export type TControlsServiceWithFactory = TWithFactoryService<TAnyControlsWrapper, TControlsParams, undefined, TControlsFactory>;
export type TControlsServiceWithRegistry = TWithRegistryService<TControlsRegistry>;

export type TControlsService = TSerializableEntitiesService<TAnyControlsWrapper, TControlsConfig> &
  TControlsServiceWithCreate &
  TControlsServiceWithCreateFromConfig &
  Readonly<{
    createFromConfig: (controls: ReadonlyArray<TControlsConfig>) => void;
  }> &
  TWithActiveAccessorsService<TAnyControlsWrapper> &
  TControlsServiceWithFactory &
  TControlsServiceWithRegistry;
