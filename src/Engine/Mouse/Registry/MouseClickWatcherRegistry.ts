import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherRegistry } from '@/Engine/Mouse/Models';

export const MouseClickWatcherRegistry = (): IMouseClickWatcherRegistry => RegistryFacade(AbstractEntityRegistry<IMouseClickWatcher>(RegistryType.MouseClickWatcher));
