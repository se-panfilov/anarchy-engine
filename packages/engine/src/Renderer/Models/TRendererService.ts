import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TRendererConfig } from './TRendererConfig';
import type { TRendererFactory } from './TRendererFactory';
import type { TRendererParams } from './TRendererParams';
import type { TRendererRegistry } from './TRendererRegistry';
import type { TRendererWrapper } from './TRendererWrapper';
import type { TRendererWrapperDependencies } from './TRendererWrapperDependencies';

export type TRendererServiceWithCreate = TWithCreateService<TRendererWrapper, TRendererParams>;
export type TRendererServiceWithCreateFromConfig = TWithCreateFromConfigService<TRendererConfig, TRendererWrapper>;
export type TRendererServiceWithFactory = TWithFactoryService<TRendererWrapper, TRendererParams, TRendererWrapperDependencies, TRendererFactory>;
export type TRendererServiceWithRegistry = TWithRegistryService<TRendererRegistry>;

export type TRendererService = TSerializableEntitiesService<TRendererWrapper, TRendererConfig> &
  TRendererServiceWithCreate &
  TRendererServiceWithCreateFromConfig &
  TWithActiveAccessorsService<TRendererWrapper> &
  TRendererServiceWithFactory &
  TRendererServiceWithRegistry;
