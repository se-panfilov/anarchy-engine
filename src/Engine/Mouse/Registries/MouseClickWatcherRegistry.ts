import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
