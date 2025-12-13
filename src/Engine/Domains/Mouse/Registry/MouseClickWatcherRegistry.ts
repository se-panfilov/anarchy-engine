import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Domains/Mouse/Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
