import type { TAudioListenersRegistry } from './TAudioListenersRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';

export type TAudioConfigToParamsDependencies = Readonly<{
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry;
  audioListenersRegistry: TAudioListenersRegistry;
}>;
