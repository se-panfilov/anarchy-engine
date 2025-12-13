import type { TAudioListenersRegistry } from './TAudioListenersRegistry';
import type { TAudioMetaInfoRegistry } from './TAudioMetaInfoRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';

export type TAudioSerializeResourcesDependencies = Readonly<{
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry;
  audioListenersRegistry: TAudioListenersRegistry;
  metaInfoRegistry: TAudioMetaInfoRegistry;
}>;
