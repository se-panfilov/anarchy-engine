import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
