import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Engine/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export function MouseClickWatcherRegistry(): TMouseClickWatcherRegistry {
  return AbstractWatcherRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher);
}
