import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TMouseClickWatcher, TMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): TMouseClickWatcherRegistry => AbstractEntityRegistry<TMouseClickWatcher>(RegistryType.MouseClickWatcher);
