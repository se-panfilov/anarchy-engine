import type { TSerializableEntitiesService } from '@Anarchy/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Anarchy/Engine/Mixins';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceFactory } from './TSpaceFactory';
import type { TSpaceFactoryDependencies } from './TSpaceFactoryDependencies';
import type { TSpaceParams } from './TSpaceParams';
import type { TSpaceRegistry } from './TSpaceRegistry';
import type { TSpaceSettings } from './TSpaceSettings';

export type TSpaceServiceWithCreate = TWithCreateService<TSpace, TSpaceParams, TSpaceSettings>;
export type TSpaceServiceWithCreateFromConfig = TWithCreateFromConfigService<TSpaceConfig, TSpace, TSpaceSettings>;
export type TSpaceServiceWithFactory = TWithFactoryService<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceFactory, TSpaceSettings>;
export type TSpaceServiceWithRegistry = TWithRegistryService<TSpaceRegistry>;

export type TSpaceService = TSerializableEntitiesService<TSpace, TSpaceConfig> & TSpaceServiceWithCreate & TSpaceServiceWithCreateFromConfig & TSpaceServiceWithFactory & TSpaceServiceWithRegistry;
