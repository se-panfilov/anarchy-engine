import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TSpace } from './TSpace';
import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceConfigAsDependency } from './TSpaceConfigAsDependency';
import type { TSpaceFactory } from './TSpaceFactory';
import type { TSpaceHooks } from './TSpaceHooks';
import type { TSpaceParams } from './TSpaceParams';
import type { TSpaceRegistry } from './TSpaceRegistry';

export type TSpaceServiceWithCreate = TWithCreateService<TSpace, TSpaceParams, TSpaceHooks>;
export type TSpaceServiceWithCreateFromConfig = TWithCreateFromConfigService<TSpaceConfig, TSpace, TSpaceHooks>;
export type TSpaceServiceWithFactory = TWithFactoryService<TSpace, TSpaceParams, TSpaceConfigAsDependency, TSpaceFactory, TSpaceHooks>;
export type TSpaceServiceWithRegistry = TWithRegistryService<TSpaceRegistry>;

export type TSpaceService = TAbstractService & TSpaceServiceWithCreate & TSpaceServiceWithCreateFromConfig & TSpaceServiceWithFactory & TSpaceServiceWithRegistry;
