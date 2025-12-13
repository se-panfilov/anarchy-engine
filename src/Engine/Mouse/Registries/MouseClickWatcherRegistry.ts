import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): TMouseClickWatcherRegistry => RegistryFacade(AbstractEntityRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher));
