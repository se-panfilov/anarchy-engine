import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Domains/Mouse/Models';
import { RegistryType } from '@/Engine/Registries';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
