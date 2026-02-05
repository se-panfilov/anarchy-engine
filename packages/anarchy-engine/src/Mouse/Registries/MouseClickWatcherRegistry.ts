import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@hellpig/anarchy-engine/Mouse/Models';

export function MouseClickWatcherRegistry(): TMouseClickWatcherRegistry {
  return AbstractWatcherRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher);
}
