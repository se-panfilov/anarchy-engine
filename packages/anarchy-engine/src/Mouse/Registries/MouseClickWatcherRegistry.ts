import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@Anarchy/Engine/Mouse/Models';

export function MouseClickWatcherRegistry(): TMouseClickWatcherRegistry {
  return AbstractWatcherRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher);
}
