import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TRendererFactory } from './TRendererFactory';
import type { TRendererParams } from './TRendererParams';
import type { TRendererRegistry } from './TRendererRegistry';
import type { TRendererWrapper } from './TRendererWrapper';
import type { TRendererWrapperDependencies } from './TRendererWrapperDependencies';

export type TRendererServiceWithCreate = TWithCreateService<TRendererWrapper, TRendererParams>;
export type TRendererServiceWithFactory = TWithFactoryService<TRendererWrapper, TRendererParams, TRendererWrapperDependencies, TRendererFactory>;
export type TRendererServiceWithRegistry = TWithRegistryService<TRendererRegistry>;

export type TRendererService = TAbstractService & TRendererServiceWithCreate & TWithActiveAccessorsService<TRendererWrapper> & TRendererServiceWithFactory & TRendererServiceWithRegistry;
