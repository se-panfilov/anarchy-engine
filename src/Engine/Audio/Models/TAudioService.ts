import type { Howl } from 'howler';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithLoadResourcesAsyncService, TWithRegistryService, TWithResourcesRegistryService } from '@/Engine/Space';

import type { TAudioConfig } from './TAudioConfig';
import type { TAudioFactory } from './TAudioFactory';
import type { TAudioParams } from './TAudioParams';
import type { TAudioRegistry } from './TAudioRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';
import type { TAudioResourceConfig } from './TAudioResourceConfig';
import type { TAudioWrapper } from './TAudioWrapper';

export type TAudioService = Readonly<{
  play: (name: string) => void;
  stop: (name: string) => void;
  setVolume: (name: string, volume: number) => void;
}> &
  TWithCreateService<TAudioWrapper, TAudioParams> &
  TWithCreateFromConfigService<TAudioConfig, TAudioWrapper> &
  TWithFactoryService<TAudioFactory> &
  TWithRegistryService<TAudioRegistry> &
  TWithResourcesRegistryService<TAudioResourceAsyncRegistry> &
  TWithLoadResourcesAsyncService<TAudioResourceConfig, Howl> &
  TDestroyable;
