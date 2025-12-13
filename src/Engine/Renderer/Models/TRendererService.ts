import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TRendererFactory } from './TRendererFactory';
import type { TRendererParams } from './TRendererParams';
import type { TRendererRegistry } from './TRendererRegistry';
import type { TRendererWrapper } from './TRendererWrapper';

export type TRendererServiceWithCreate = TWithCreateService<TRendererWrapper, TRendererParams>;
export type TRendererServiceWithFactory = TWithFactoryService<TRendererWrapper, TRendererParams, undefined, TRendererFactory>;
export type TRendererServiceWithRegistry = TWithRegistryService<TRendererRegistry>;

export type TRendererService = TAbstractService & TRendererServiceWithCreate & TWithActiveAccessorsService<TRendererWrapper> & TRendererServiceWithFactory & TRendererServiceWithRegistry;
