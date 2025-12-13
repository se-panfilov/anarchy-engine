import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractEntityRegistry<IOrbitControlsWrapper>(RegistryType.Controls));
