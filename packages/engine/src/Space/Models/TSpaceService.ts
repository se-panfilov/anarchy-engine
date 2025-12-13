import type { TSerializableEntitiesService } from '@Engine/Abstract';
import type { TWithCreateFromConfigServiceWithHooks, TWithCreateServiceWithHooks, TWithFactoryService, TWithRegistryService } from '@Engine/Mixins';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceFactory } from './TSpaceFactory';
import type { TSpaceFactoryDependencies } from './TSpaceFactoryDependencies';
import type { TSpaceHooks } from './TSpaceHooks';
import type { TSpaceParams } from './TSpaceParams';
import type { TSpaceRegistry } from './TSpaceRegistry';

export type TSpaceServiceWithCreate = TWithCreateServiceWithHooks<TSpace, TSpaceParams, TSpaceHooks>;
export type TSpaceServiceWithCreateFromConfig = TWithCreateFromConfigServiceWithHooks<TSpaceConfig, TSpace, TSpaceHooks>;
export type TSpaceServiceWithFactory = TWithFactoryService<TSpace, TSpaceParams, TSpaceFactoryDependencies, TSpaceFactory>;
export type TSpaceServiceWithRegistry = TWithRegistryService<TSpaceRegistry>;

export type TSpaceService = TSerializableEntitiesService<TSpace, TSpaceConfig> & TSpaceServiceWithCreate & TSpaceServiceWithCreateFromConfig & TSpaceServiceWithFactory & TSpaceServiceWithRegistry;
