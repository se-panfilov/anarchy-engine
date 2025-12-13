import type { AudioListener } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService, TWithResourcesRegistryService } from '@/Engine/Space';

import type { TAnyAudioWrapper } from './TAnyAudioWrapper';
import type { TAudioConfig } from './TAudioConfig';
import type { TAudioFactory } from './TAudioFactory';
import type { TAudioListenersRegistry } from './TAudioListenersRegistry';
import type { TAudioParams } from './TAudioParams';
import type { TAudioRegistry } from './TAudioRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';
import type { TAudioResourceConfig } from './TAudioResourceConfig';

export type TAudioService = TWithCreateService<TAnyAudioWrapper, TAudioParams> &
  TWithCreateFromConfigService<TAudioConfig, TAnyAudioWrapper> &
  TWithFactoryService<TAudioFactory> &
  TWithRegistryService<TAudioRegistry> &
  TWithResourcesRegistryService<TAudioResourceAsyncRegistry> &
  Readonly<{
    getListenersRegistry: () => TAudioListenersRegistry;
    getMainListener: () => AudioListener | undefined;
  }> &
  TWithLoadResourcesAsyncService<TAudioResourceConfig, AudioBuffer> &
  TDestroyable;
