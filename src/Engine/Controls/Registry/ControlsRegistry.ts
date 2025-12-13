import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IControlsRegistry, IControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractEntityRegistry<IControlsWrapper>(RegistryType.Controls));
