import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
