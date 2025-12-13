import type { AudioListener } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService, TWithResourcesRegistryService } from '@/Engine/Mixins';

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
export type TAudioServiceWithFactory = TWithFactoryService<TAnyAudioWrapper, TAnyAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>, TAudioFactory, undefined>;
export type TAudioServiceWithRegistry = TWithRegistryService<TAudioRegistry>;

export type TAudioService = TAbstractService &
  TAudioServiceWithCreate &
  TAudioServiceWithCreateFromConfig &
  TAudioServiceWithFactory &
  TAudioServiceWithRegistry &
  TWithResourcesRegistryService<TAudioResourceAsyncRegistry> &
  Readonly<{
    getListenersRegistry: () => TAudioListenersRegistry;
    getMainListener: () => AudioListener | undefined;
  }> &
  TWithLoadResourcesAsyncService<TAudioResourceConfig, AudioBuffer>;
