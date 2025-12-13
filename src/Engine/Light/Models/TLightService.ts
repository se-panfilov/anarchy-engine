import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Mixins';

import type { TAbstractLightWrapper } from './TAbstractLightWrapper';
import type { TLight } from './TLight';
import type { TAnyLightConfig } from './TLightConfig';
import type { TLightFactory } from './TLightFactory';
import type { TLightParams } from './TLightParams';
import type { TLightRegistry } from './TLightRegistry';

export type TLightServiceWithCreate = TWithCreateService<TAbstractLightWrapper<TLight>, TLightParams>;
export type TLightServiceWithCreateFromConfig = TWithCreateFromConfigService<TAnyLightConfig, TAbstractLightWrapper<TLight>>;
export type TLightServiceWithFactory = TWithFactoryService<TAbstractLightWrapper<TLight>, TLightParams, undefined, TLightFactory>;
export type TLightServiceWithRegistry = TWithRegistryService<TLightRegistry>;

export type TLightService = TAbstractService & TLightServiceWithCreate & TLightServiceWithCreateFromConfig & TLightServiceWithFactory & TLightServiceWithRegistry & TWithSceneGetterService;
