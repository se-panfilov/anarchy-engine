import type { AudioListener } from 'three';

import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Engine/Abstract';
import type {
  TWithCreateFromConfigService,
  TWithCreateService,
  TWithFactoryService,
  TWithLoadResourcesAsyncService,
  TWithRegistryService,
  TWithResourcesMetaInfoRegistryService,
  TWithResourcesRegistryService
} from '@/Engine/Mixins';

import type { TAnyAudioConfig } from './TAnyAudioConfig';
import type { TAnyAudioParams } from './TAnyAudioParams';
import type { TAnyAudioWrapper } from './TAnyAudioWrapper';
import type { TAudioFactory } from './TAudioFactory';
import type { TAudioListenersRegistry } from './TAudioListenersRegistry';
import type { TAudioRegistry } from './TAudioRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';
import type { TAudioResourceConfig } from './TAudioResourceConfig';
import type { TAudioWrapperDependencies } from './TAudioWrapperDependencies';

export type TAudioServiceWithCreate = TWithCreateService<TAnyAudioWrapper, TAnyAudioParams>;
export type TAudioServiceWithCreateFromConfig = TWithCreateFromConfigService<TAnyAudioConfig, TAnyAudioWrapper>;
export type TAudioServiceWithFactory = TWithFactoryService<TAnyAudioWrapper, TAnyAudioParams, TAudioWrapperDependencies, TAudioFactory>;
export type TAudioServiceWithRegistry = TWithRegistryService<TAudioRegistry>;

export type TAudioService = TAudioServiceWithCreate &
  TAudioServiceWithCreateFromConfig &
  TAudioServiceWithFactory &
  TAudioServiceWithRegistry &
  TSerializableEntitiesService<TAnyAudioWrapper, TAnyAudioConfig> &
  TSerializableResourceService<TAudioResourceConfig> &
  TWithLoadResourcesAsyncService<TAudioResourceConfig, AudioBuffer> &
  TWithResourcesMetaInfoRegistryService<TAudioResourceConfig> &
  TWithResourcesRegistryService<TAudioResourceAsyncRegistry> &
  Readonly<{
    getListenersRegistry: () => TAudioListenersRegistry;
    getMainListener: () => AudioListener | undefined;
  }>;
