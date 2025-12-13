import { RegistryType } from '@/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@/Mouse/Models';

export function MouseClickWatcherRegistry(): TMouseClickWatcherRegistry {
  return AbstractWatcherRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher);
}
